var fs = require('fs-extra-promise');
var path = require('path');
var tmp = require('tmp');

/**
 * Factory function for resolver
 * It is called only one time by Bower, to instantiate resolver.
 * You can instantiate here any caches or create helper functions.
 */
module.exports = function resolver (bower) {

  // Resolver factory returns an instance of resolver
  return {

    // Match method tells whether resolver supports given source
    // It can return either boolean or promise of boolean
    match: function (source) {
        if (['.', '/', '~'].indexOf(source.charAt(0)) === -1) return false;
        return fs.isDirectoryAsync(path.resolve(source))
        .catch(function() {
            return false;
        });
    },

    // It downloads package and extracts it to temporary directory
    // You can use npm's "tmp" package to tmp directories
    // See the "Resolver API" section for details on this method
    fetch: function (endpoint, cached) {
        var tmpDir = tmp.dirSync().name;
        return fs.copyAsync(endpoint.source, tmpDir)
        .then(function() {
            return {
                tempPath: tmpDir,
                removeIgnores: true
            };
        })
        .catch(function() {
            return;
        });
    }
  };
};
