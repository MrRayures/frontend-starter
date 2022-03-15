// nunjucks.config.js
module.exports = {
  "options": {
    /**
     * A path to the file containing data for the template.
     * If you want to pass an object, use "render.context" instead.
     */
     "data": {}
  },

  /**
   * The following keys are members of Nunjucks.
   * To modify any parameter or see possible values,
   * plese check https://mozilla.github.io/nunjucks/api.html
   */

  // Executes nunjucks.configure([path], [options]).
  "configure": {
    "path": "src/",
    "options": {
      "autoescape": true,
      "throwOnUndefined": false,
      //"watch": true
    }
  },

  // Executes nunjucks.render(name, [context], [callback]).
  "render": {
    "name": undefined, // You shouldn't change this.
    /**
     * An object literal containing the data for the template.
     * If you need to load data from a file, use "options.data" instead.
     * If you decide to use "options.data" too, this property will be assigned to it.
     */
    "context": {
      project_name:  'Hello world',
      img_path:  'assets/img/'
    },
    "callback": () => {} // Not modificable.
  }

};