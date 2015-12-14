/**
 * @fileoverview Disallow classNames that belong to other React component
 * @author Thai Pangsakulyanont
 * @copyright 2015 Thai Pangsakulyanont. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/bem-no-foreign-element"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("bem-no-foreign-element", rule, {

    valid: [
        {
            code: "var pass = <div className='tw-cover'></div>;",
            filename: "Cover.react.js",
            parser: "babel-eslint",
        }
    ],

    invalid: [
        {
            code: "var fail = <div className='tw-cover'></div>;",
            filename: "Popup.react.js",
            errors: [{
                message: "'Popup.react.js' may only use BEM class 'tw-popup'. 'tw-cover' should be used in 'Cover.react.js'.",
            }],
            parser: "babel-eslint",
        },
        {
            code: "var fail = <div className='tw-tasklist-narrow__menu --open'></div>;",
            filename: "ProjectList.react.js",
            errors: [{
                message: "'ProjectList.react.js' may only use BEM class 'tw-project-list'. 'tw-tasklist-narrow' should be used in 'TasklistNarrow.react.js'.",
            }],
            parser: "babel-eslint",
        },
        {
            code: "var fail = <div><span className='tw-icon-task'></span></div>;",
            errors: [{
                message: "Please don’t use tw-icon-* classes; use `<Icon name='task' />` instead.",
            }],
            parser: "babel-eslint",
        },
        {
            code: "var fail = <div><i className='tw-icon-workspace'></i></div>;",
            errors: [{
                message: "Please don’t use tw-icon-* classes; use `<Icon name='workspace' />` instead.",
            }],
            parser: "babel-eslint",
        },
    ]
});
