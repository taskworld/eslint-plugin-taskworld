/**
 * @fileoverview Disallows Reflux.listenTo in favor of withRefluxStore
 * @author Thai Pangsakulyanont
 * @copyright 2015 Thai Pangsakulyanont. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
    return {
        MemberExpression: function(node) {
            if (
                node.object && node.object.name === "Reflux" &&
                node.property && node.property.name === "listenTo"
            ) {
                context.report(node, "Please do not use Reflux.listenTo() anymore. Use higher-order component `withRefluxStore` instead.");
            }
        }
    };
};

module.exports.schema = [
];
