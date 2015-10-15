/**
 * @fileoverview Ensure that a promise is either returned or ended with done.
 * @author Thai Pangsakulyanont
 * @copyright 2015 Thai Pangsakulyanont. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    // variables should be defined here

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        ExpressionStatement: function (node) {
            if (node.expression.type !== 'CallExpression') {
                return;
            }
            if (node.expression.callee.type !== 'MemberExpression') {
                return;
            }
            if (node.expression.callee.property.name !== 'then' &&
                node.expression.callee.property.name !== 'catch') {
                return;
            }
            context.report(node, 'A promise chain should either be returned or ended with `.done()`.');
        },

        ReturnStatement: function (node) {
            if (node.argument.type !== 'CallExpression') {
                return;
            }
            if (node.argument.callee.type !== 'MemberExpression') {
                return;
            }
            if (node.argument.callee.property.name !== 'done') {
                return;
            }
            context.report(node, 'A promise chain ended with `.done()` should not be returned.');
        },
    };

};

module.exports.schema = [
    // fill in your schema
];
