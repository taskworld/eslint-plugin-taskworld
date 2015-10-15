/**
 * @fileoverview Disallow classNames that belong to other React component
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
    function getValidClassName () {
        var filename = context.getFilename();
        if (!filename) {
            return null;
        }
        var match = filename.match(/(\w+)\.react\.js$/i);
        if (!match) {
            return null;
        }
        return 'tw' + match[1].replace(/[A-Z]/g, function ($0) {
            return '-' + $0.toLowerCase();
        });
    }

    function getNodeClassName (node) {
        if (!node.value) {
            return null;
        }
        var className = node.value;
        var match = className.match(/tw-[a-z0-9\-]+/)
        if (!match) {
            return null;
        }
        return match[0];
    }

    function undash (string) {
        return string.replace(/\-/g, '');
    }

    function deriveFilenameFromClassName (className) {
        return className.replace(/^tw-/, '-').replace(/\-(\w)/g, function ($0, $1) {
            return $1.toUpperCase();
        }) + '.react.js';
    }

    // any helper functions should go here or else delete this section

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
            var validClassName = getValidClassName();
            if (!validClassName) {
                return;
            }
            var nodeClassName = getNodeClassName(node);
            if (!nodeClassName) {
                return;
            }
            if (undash(nodeClassName) !== undash(validClassName)) {
                var derivedNodeFilename = deriveFilenameFromClassName(nodeClassName);
                context.report(node,
                  "'" + context.getFilename() + "' may only use BEM class '" + validClassName + "'. " +
                  "'" + nodeClassName + "' should be used in '" + derivedNodeFilename + "'."
                );
            }
        },

    };

};

module.exports.schema = [
    // fill in your schema
];