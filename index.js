var fs = require('fs-extra-promise');
var path = require('path');
var os = require('os');

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
        return fs.isDirectoryAsync(path.resolve(source))
        .catch(function() {
            return false;
        });
    },

    // Optional:
    // Can resolve or normalize sources, like:
    // "jquery" => "git://github.com/jquery/jquery.git"
    locate: function (source) {
        return path.resolve(source);
    },

    // Optional:
    // Allows to list available versions of given source.
    // Bower chooses matching release and passes it to "fetch"
    releases: function (source) {
        return fs.readJsonAsync(path.join(source, 'bower.json'))
        .then(function(bw) {
            return [{
                target: bw.version,
                version: bw.version
            }];
        })
        .catch(function(err) {
            return [];
        });
    },

    // It downloads package and extracts it to temporary directory
    // You can use npm's "tmp" package to tmp directories
    // See the "Resolver API" section for details on this method
    fetch: function (endpoint, cached) {
        var tempPath = path.join(os.tmpdir(), endpoint.name);
        return fs.copyAsync(endpoint.source, tempPath)
        .then(function() {
            return {
                tempPath: tempPath,
                removeIgnores: true
            };
        });
    }
  };
};
