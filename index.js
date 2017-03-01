var fs = require('fs-extra-promise');
var path = require('path');
var tmp = require('tmp');

/**
 * Factory function for resolver
 * It is called only one time by Bower, to instantiate resolver.
 * You can instantiate here any caches or create helper functions.
 */
module.exports = function resolver (bower) {

  return {

    match: function (source) {
        if (['.', '/', '~', '\\'].indexOf(source.charAt(0)) === -1) return false;
        return fs.isDirectoryAsync(path.resolve(source))
        .catch(function() {
            return false;
        });
    },

    releases: function (source) {
        var bjsPath = path.join(source, 'bower.json');
        return fs.readJsonAsync(bjsPath)
        .then(function(bjs) {
            return [{
                target: bjs.version,
                version: bjs.version
            }];
        });
    },

    fetch: function (endpoint, cached) {
        var tmpDir = tmp.dirSync().name;
        return fs.realpathAsync(endpoint.source)
        .then(function(realPath) {
            return fs.copyAsync(realPath, tmpDir)
            .then(function() {
                return {
                    tempPath: tmpDir,
                    removeIgnores: true
                };
            });
        })
        .catch(function(err) {
            console.log(err);
            return;
        });
    }
  };
};
