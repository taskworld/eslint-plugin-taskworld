/**
 * @fileoverview Disallow bare modifiers in React classNames.
 * @author Thai Pangsakulyanont
 * @copyright 2015 Thai Pangsakulyanont. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        Literal: function(node) {
            if (node.parent.type !== 'JSXAttribute') {
                return;
            }
            if (!node.parent.name || node.parent.name.name !== 'className') {
                return;
            }
            if (/\-\-\w+/.test(node.value) && !/(?:\s|^)tw\-/.test(node.value)) {
                context.report(node, 'BEM modifier must be used in conjunction with block or element.');
            }
        },

    };

};

module.exports.schema = [
];
