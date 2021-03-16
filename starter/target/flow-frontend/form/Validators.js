import isAfter from 'validator/es/lib/isAfter';
import isBefore from 'validator/es/lib/isBefore';
import isBoolean from 'validator/es/lib/isBoolean';
import isDecimal from 'validator/es/lib/isDecimal';
import isEmail from 'validator/es/lib/isEmail';
import isFloat from 'validator/es/lib/isFloat';
import isLength from 'validator/es/lib/isLength';
import isNumeric from 'validator/es/lib/isNumeric';
import matches from 'validator/es/lib/matches';
import toFloat from 'validator/es/lib/toFloat';
class AbstractValidator {
    constructor(attrs) {
        this.message = 'invalid';
        this.impliesRequired = false;
        if (attrs && attrs.message) {
            this.message = attrs.message;
        }
    }
}
export class Required extends AbstractValidator {
    constructor() {
        super(...arguments);
        this.impliesRequired = true;
    }
    validate(value) {
        if (typeof value === 'string' || Array.isArray(value)) {
            return value.length > 0;
        }
        else if (typeof value === 'number') {
            return Number.isFinite(value);
        }
        return value !== undefined;
    }
}
function _asValidatorAttributes(attrs) {
    return typeof attrs === 'object' ? attrs : {};
}
function _value(attrs) {
    return typeof attrs === 'object' ? attrs.value : attrs;
}
class NumberValidator extends AbstractValidator {
    constructor(attrs) {
        super(attrs);
    }
    validate(value) {
        return isNumeric(String(value));
    }
}
export class IsNumber extends NumberValidator {
    constructor(optional, attrs) {
        super(Object.assign({ message: 'must be a number' }, attrs));
        this.optional = optional;
    }
    validate(value) {
        return (this.optional && value === undefined) || super.validate(value);
    }
}
class ValueNumberValidator extends NumberValidator {
    constructor(attrs) {
        super(_asValidatorAttributes(attrs));
        const val = _value(attrs);
        this.value = typeof val === 'string' ? parseFloat(val) : val;
    }
}
// JSR380 equivalent (https://beanvalidation.org/2.0/spec/#builtinconstraints)
export class Email extends AbstractValidator {
    constructor(attrs) {
        super(Object.assign({ message: 'must be a well-formed email address' }, attrs));
    }
    validate(value) {
        return isEmail(value);
    }
}
export class Null extends AbstractValidator {
    constructor(attrs) {
        super(Object.assign({ message: 'must be null' }, attrs));
    }
    validate(value) {
        return value == null;
    }
}
export class NotNull extends Required {
    constructor(attrs) {
        super(Object.assign({ message: 'must not be null' }, attrs));
    }
    validate(value) {
        return !new Null().validate(value);
    }
}
export class NotEmpty extends Required {
    constructor(attrs) {
        super(Object.assign({ message: 'must not be empty' }, attrs));
    }
    validate(value) {
        return super.validate(value) && new NotNull().validate(value) && value.length > 0;
    }
}
export class NotBlank extends Required {
    constructor(attrs) {
        super(Object.assign({ message: 'must not be blank' }, attrs));
    }
    validate(value) {
        return new NotEmpty().validate(value);
    }
}
export class AssertTrue extends AbstractValidator {
    constructor(attrs) {
        super(Object.assign({ message: 'must be true' }, attrs));
    }
    validate(value) {
        return isBoolean(String(value)) && String(value) === 'true';
    }
}
export class AssertFalse extends AbstractValidator {
    constructor(attrs) {
        super(Object.assign({ message: 'must be false' }, attrs));
    }
    validate(value) {
        return !new AssertTrue().validate(value);
    }
}
function _asValueNumberAttributes(attrs) {
    return typeof attrs === 'object' ? attrs : { value: attrs };
}
export class Min extends ValueNumberValidator {
    constructor(attrs) {
        super(Object.assign({ message: `must be greater than or equal to ${_value(attrs)}` }, _asValueNumberAttributes(attrs)));
    }
    validate(value) {
        return super.validate(value) && isFloat(String(value), { min: this.value });
    }
}
export class Max extends ValueNumberValidator {
    constructor(attrs) {
        super(Object.assign({ message: `must be less than or equal to ${_value(attrs)}` }, _asValueNumberAttributes(attrs)));
    }
    validate(value) {
        return super.validate(value) && isFloat(String(value), { max: this.value });
    }
}
function _inclusive(attrs) {
    return typeof attrs !== 'object' || attrs.inclusive !== false;
}
export class DecimalMin extends ValueNumberValidator {
    constructor(attrs) {
        super(Object.assign({ message: `must be greater than ${_inclusive(attrs) ? 'or equal to ' : ''}${_value(attrs)}` }, _asValueNumberAttributes(attrs)));
        this.inclusive = _inclusive(attrs);
    }
    validate(value) {
        return super.validate(value) && isFloat(String(value), { [this.inclusive ? 'min' : 'gt']: this.value });
    }
}
export class DecimalMax extends ValueNumberValidator {
    constructor(attrs) {
        super(Object.assign({ message: `must be less than ${_inclusive(attrs) ? 'or equal to ' : ''}${_value(attrs)}` }, _asValueNumberAttributes(attrs)));
        this.inclusive = _inclusive(attrs);
    }
    validate(value) {
        return super.validate(value) && isFloat(String(value), { [this.inclusive ? 'max' : 'lt']: this.value });
    }
}
export class Negative extends AbstractValidator {
    constructor(attrs) {
        super(Object.assign({ message: 'must be less than 0' }, attrs));
    }
    validate(value) {
        return toFloat(`${value}`) < 0;
    }
}
export class NegativeOrZero extends AbstractValidator {
    constructor(attrs) {
        super(Object.assign({ message: 'must be less than or equal to 0' }, attrs));
    }
    validate(value) {
        return toFloat(`${value}`) <= 0;
    }
}
export class Positive extends AbstractValidator {
    constructor(attrs) {
        super(Object.assign({ message: 'must be greater than 0' }, attrs));
    }
    validate(value) {
        return toFloat(`${value}`) > 0;
    }
}
export class PositiveOrZero extends AbstractValidator {
    constructor(attrs) {
        super(Object.assign({ message: 'must be greater than or equal to 0' }, attrs));
    }
    validate(value) {
        return toFloat(`${value}`) >= 0;
    }
}
function _min(attrs) {
    return attrs.min || 0;
}
function _max(attrs) {
    return attrs.max || Number.MAX_SAFE_INTEGER;
}
export class Size extends AbstractValidator {
    constructor(attrs) {
        super(Object.assign({ message: `size must be between ${_min(attrs)} and ${_max(attrs)}` }, attrs));
        this.min = _min(attrs);
        this.max = _max(attrs);
        if (this.min > 0) {
            this.impliesRequired = true;
        }
    }
    validate(value) {
        if (this.min && this.min > 0 && !new Required().validate(value)) {
            return false;
        }
        return isLength(value, { min: this.min, max: this.max });
    }
}
export class Digits extends AbstractValidator {
    constructor(attrs) {
        super(Object.assign({ message: `numeric value out of bounds (<${attrs.integer} digits>.<${attrs.fraction} digits> expected)` }, attrs));
        this.integer = attrs.integer;
        this.fraction = attrs.fraction;
    }
    validate(value) {
        return (String(toFloat(`${value}`)).replace(/(.*)\.\d+/, '$1').length === this.integer &&
            isDecimal(`${value}`, { decimal_digits: `0,${this.fraction}` }));
    }
}
export class Past extends AbstractValidator {
    constructor(attrs) {
        super(Object.assign({ message: 'must be a past date' }, attrs));
    }
    validate(value) {
        return isBefore(value);
    }
}
/*
  @PastOrPresent has no client-side implementation yet.
  It would consider any input valid and let the server-side to do validation.
  (It's not trivial to ensure the same granularity of _present_ as on the server-side:
  year / month / day / minute).
*/
// export class PastOrPresent extends AbstractValidator<any> {
//   constructor(attrs?: ValidatorAttributes) {
//     super({ message: 'must be a date in the past or in the present', ...attrs });
//   }
//   validate() {
//     return true;
//   }
// }
export class Future extends AbstractValidator {
    constructor(attrs) {
        super(Object.assign({ message: 'must be a future date' }, attrs));
    }
    validate(value) {
        return isAfter(value);
    }
}
/*
  @FutureOrPresent has no client-side implementation yet.
  It would consider any input valid and let the server-side to do validation.
  (It's not trivial to ensure the same granularity of _present_ as on the server-side:
  year / month / day / minute).
*/
// export class FutureOrPresent extends AbstractValidator<any> {
//   constructor(attrs?: ValidatorAttributes) {
//     super({ message: 'must be a date in the present or in the future', ...attrs });
//   }
//   validate = () => true;
// }
function _regexp(attrs) {
    return typeof attrs === 'string'
        ? new RegExp(attrs)
        : attrs instanceof RegExp
            ? attrs
            : typeof attrs.regexp === 'string'
                ? new RegExp(attrs.regexp)
                : attrs.regexp;
}
export class Pattern extends AbstractValidator {
    constructor(attrs) {
        super(Object.assign({ message: `must match the following regular expression: ${_regexp(attrs)}` }, _asValidatorAttributes(attrs)));
        this.regexp = _regexp(attrs);
    }
    validate(value) {
        return matches(value, this.regexp);
    }
}
//# sourceMappingURL=Validators.js.map