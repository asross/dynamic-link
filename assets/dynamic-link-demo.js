/* jshint ignore:start */

/* jshint ignore:end */

define('dynamic-link-demo/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'dynamic-link-demo/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('dynamic-link-demo/components/dynamic-link', ['exports', 'ember', 'dynamic-link/components/dynamic-link'], function (exports, Ember, DynamicLink) {

	'use strict';

	exports['default'] = DynamicLink['default'];

});
define('dynamic-link-demo/controllers/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    navLinks: [{
      action: 'toggleNavColor',
      text: 'Action'
    }, {
      route: 'book',
      model: 1,
      text: 'Route'
    }, {
      href: 'http://emberjs.com',
      text: 'Normal',
      target: '_blank'
    }],

    actionOptions: ['toggleNavColor', 'yellowAlert', 'addNavLink'],

    routeOptions: ['about', 'book', 'books'],

    actions: {
      removeNavLink: function removeNavLink(link) {
        this.get('navLinks').removeObject(link);
      },

      addNavLink: function addNavLink(type) {
        var newLink = {};
        if (type === 'route') {
          newLink.route = 'about';
          newLink.text = 'About';
        } else if (type === 'action') {
          newLink.action = 'yellowAlert';
          newLink.text = 'Yellow Alert';
        } else {
          newLink.href = 'http://google.com';
          newLink.text = 'Google';
          newLink.target = '_blank';
        }
        this.get('navLinks').pushObject(newLink);
      },

      toggleNavColor: function toggleNavColor() {
        this.toggleProperty('navInverted');
      },

      yellowAlert: function yellowAlert() {
        alert('yellow!');
      }
    }
  });

});
define('dynamic-link-demo/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('dynamic-link-demo/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('dynamic-link-demo/initializers/export-application-global', ['exports', 'ember', 'dynamic-link-demo/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('dynamic-link-demo/instance-initializers/app-version', ['exports', 'dynamic-link-demo/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('dynamic-link-demo/router', ['exports', 'ember', 'dynamic-link-demo/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('about');

    this.route('books');
    this.route('book', { path: 'books/:id' });
  });

  exports['default'] = Router;

});
define('dynamic-link-demo/routes/book', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model(params) {
      return [{ id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }, { id: 2, title: 'The Bluest Eye', author: 'Toni Morrison' }, { id: 3, title: 'Ulysses', author: 'James Joyce' }].findBy('id', parseInt(params.id));
    }
  });

});
define('dynamic-link-demo/routes/books', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return [{ id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }, { id: 2, title: 'The Bluest Eye', author: 'Toni Morrison' }, { id: 3, title: 'Ulysses', author: 'James Joyce' }];
    }
  });

});
define('dynamic-link-demo/routes/index', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      this.transitionTo('about');
    }
  });

});
define('dynamic-link-demo/templates/about', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "dynamic-link-demo/templates/about.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("About");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\nThis is a demo of ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        dom.setAttribute(el1,"href","https://github.com/asross/dynamic-link");
        var el2 = dom.createTextNode("Dynamic Link");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode(", a library that helps you define links based on custom parameters.\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dynamic-link-demo/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 2,
              "column": 55
            }
          },
          "moduleName": "dynamic-link-demo/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Dynamic Link");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 7,
                "column": 10
              },
              "end": {
                "line": 7,
                "column": 64
              }
            },
            "moduleName": "dynamic-link-demo/templates/application.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["content","linkParams.text",["loc",[null,[7,45],[7,64]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 4
            },
            "end": {
              "line": 8,
              "column": 4
            }
          },
          "moduleName": "dynamic-link-demo/templates/application.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
          return morphs;
        },
        statements: [
          ["block","dynamic-link",[],["params",["subexpr","@mut",[["get","linkParams",["loc",[null,[7,33],[7,43]]]]],[],[]]],0,null,["loc",[null,[7,10],[7,81]]]]
        ],
        locals: ["linkParams"],
        templates: [child0]
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 4
            },
            "end": {
              "line": 10,
              "column": 4
            }
          },
          "moduleName": "dynamic-link-demo/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","#");
          var el3 = dom.createTextNode("Add some nav links!");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [1, 0]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element3);
          return morphs;
        },
        statements: [
          ["element","action",["addNavLink","plain"],[],["loc",[null,[9,11],[9,42]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child3 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 31,
                "column": 8
              },
              "end": {
                "line": 34,
                "column": 8
              }
            },
            "moduleName": "dynamic-link-demo/templates/application.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          route=");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n          model=");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
            morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
            return morphs;
          },
          statements: [
            ["inline","view",["select"],["content",["subexpr","@mut",[["get","routeOptions",["loc",[null,[32,40],[32,52]]]]],[],[]],"value",["subexpr","@mut",[["get","linkParams.route",["loc",[null,[32,59],[32,75]]]]],[],[]]],["loc",[null,[32,16],[32,77]]]],
            ["inline","input",[],["class","tiny-input","value",["subexpr","@mut",[["get","linkParams.model",["loc",[null,[33,49],[33,65]]]]],[],[]]],["loc",[null,[33,16],[33,67]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "revision": "Ember@1.13.3",
              "loc": {
                "source": null,
                "start": {
                  "line": 34,
                  "column": 8
                },
                "end": {
                  "line": 37,
                  "column": 8
                }
              },
              "moduleName": "dynamic-link-demo/templates/application.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("          action=");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n           \n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
              return morphs;
            },
            statements: [
              ["inline","view",["select"],["content",["subexpr","@mut",[["get","actionOptions",["loc",[null,[35,41],[35,54]]]]],[],[]],"value",["subexpr","@mut",[["get","linkParams.action",["loc",[null,[35,61],[35,78]]]]],[],[]]],["loc",[null,[35,17],[35,80]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        var child1 = (function() {
          return {
            meta: {
              "revision": "Ember@1.13.3",
              "loc": {
                "source": null,
                "start": {
                  "line": 37,
                  "column": 8
                },
                "end": {
                  "line": 39,
                  "column": 8
                }
              },
              "moduleName": "dynamic-link-demo/templates/application.hbs"
            },
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("          href=");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n        ");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
              return morphs;
            },
            statements: [
              ["inline","input",[],["value",["subexpr","@mut",[["get","linkParams.href",["loc",[null,[38,29],[38,44]]]]],[],[]]],["loc",[null,[38,15],[38,46]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 34,
                "column": 8
              },
              "end": {
                "line": 39,
                "column": 8
              }
            },
            "moduleName": "dynamic-link-demo/templates/application.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["block","if",[["get","linkParams.action",["loc",[null,[34,18],[34,35]]]]],[],0,1,["loc",[null,[34,8],[39,8]]]]
          ],
          locals: [],
          templates: [child0, child1]
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 22,
              "column": 2
            },
            "end": {
              "line": 46,
              "column": 2
            }
          },
          "moduleName": "dynamic-link-demo/templates/application.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("\n\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          dom.setAttribute(el2,"href","#");
          dom.setAttribute(el2,"class","btn btn-xs btn-info");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          dom.setAttribute(el3,"class","glyphicon glyphicon-remove");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("kbd");
          var el3 = dom.createTextNode("<a\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          dom.setAttribute(el3,"class","initial-segment");
          var el4 = dom.createTextNode("\n");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      class=");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      target=");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode(">");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("</a>\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var element2 = dom.childAt(element0, [3]);
          var morphs = new Array(5);
          morphs[0] = dom.createElementMorph(element1);
          morphs[1] = dom.createMorphAt(dom.childAt(element2, [1]),1,1);
          morphs[2] = dom.createMorphAt(element2,3,3);
          morphs[3] = dom.createMorphAt(element2,5,5);
          morphs[4] = dom.createMorphAt(element2,7,7);
          return morphs;
        },
        statements: [
          ["element","action",["removeNavLink",["get","linkParams",["loc",[null,[25,32],[25,42]]]]],[],["loc",[null,[25,7],[25,44]]]],
          ["block","if",[["get","linkParams.route",["loc",[null,[31,14],[31,30]]]]],[],0,1,["loc",[null,[31,8],[39,15]]]],
          ["inline","input",[],["class","small-input","value",["subexpr","@mut",[["get","linkParams.className",["loc",[null,[41,46],[41,66]]]]],[],[]]],["loc",[null,[41,12],[41,68]]]],
          ["inline","input",[],["class","small-input","value",["subexpr","@mut",[["get","linkParams.target",["loc",[null,[42,47],[42,64]]]]],[],[]]],["loc",[null,[42,13],[42,66]]]],
          ["inline","input",[],["value",["subexpr","@mut",[["get","linkParams.text",["loc",[null,[42,84],[42,99]]]]],[],[]]],["loc",[null,[42,70],[42,101]]]]
        ],
        locals: ["linkParams"],
        templates: [child0, child1]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 52,
            "column": 0
          }
        },
        "moduleName": "dynamic-link-demo/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("header");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","container");
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("nav");
        dom.setAttribute(el3,"class","collapse navbar-collapse");
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4,"class","nav navbar-nav");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("  ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n  ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"class","btn btn-sm btn-default");
        dom.setAttribute(el2,"href","#");
        var el3 = dom.createTextNode("Add normal link");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"class","btn btn-sm btn-default");
        dom.setAttribute(el2,"href","#");
        var el3 = dom.createTextNode("Add route link");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"class","btn btn-sm btn-default");
        dom.setAttribute(el2,"href","#");
        var el3 = dom.createTextNode("Add action link");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element4 = dom.childAt(fragment, [0]);
        var element5 = dom.childAt(fragment, [4]);
        var element6 = dom.childAt(element5, [3]);
        var element7 = dom.childAt(element5, [5]);
        var element8 = dom.childAt(element5, [7]);
        var morphs = new Array(9);
        morphs[0] = dom.createAttrMorph(element4, 'class');
        morphs[1] = dom.createMorphAt(element4,1,1);
        morphs[2] = dom.createMorphAt(dom.childAt(element4, [3, 1, 1]),1,1);
        morphs[3] = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
        morphs[4] = dom.createAttrMorph(element5, 'class');
        morphs[5] = dom.createMorphAt(dom.childAt(element5, [1]),1,1);
        morphs[6] = dom.createElementMorph(element6);
        morphs[7] = dom.createElementMorph(element7);
        morphs[8] = dom.createElementMorph(element8);
        return morphs;
      },
      statements: [
        ["attribute","class",["concat",["navbar"," ","navbar-static-top"," ",["subexpr","if",[["get","navInverted",[]],"navbar-inverse","navbar-default"],[],[]]]]],
        ["block","link-to",["about"],["class","navbar-brand"],0,null,["loc",[null,[2,2],[2,67]]]],
        ["block","each",[["get","navLinks",["loc",[null,[6,26],[6,34]]]]],[],1,2,["loc",[null,[6,4],[10,13]]]],
        ["content","outlet",["loc",[null,[17,2],[17,12]]]],
        ["attribute","class",["concat",["edit-nav-links"," ","navbar"," ","navbar-fixed-bottom"," ",["subexpr","if",[["get","navInverted",[]],"navbar-inverse","navbar-default"],[],[]]]]],
        ["block","each",[["get","navLinks",["loc",[null,[22,10],[22,18]]]]],[],3,null,["loc",[null,[22,2],[46,11]]]],
        ["element","action",["addNavLink","plain"],[],["loc",[null,[48,5],[48,36]]]],
        ["element","action",["addNavLink","route"],[],["loc",[null,[49,5],[49,36]]]],
        ["element","action",["addNavLink","action"],[],["loc",[null,[50,5],[50,37]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  }()));

});
define('dynamic-link-demo/templates/book', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 24
            }
          },
          "moduleName": "dynamic-link-demo/templates/book.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Back");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "dynamic-link-demo/templates/book.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Book");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nBy ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment,2,2,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,6,6,contextualElement);
        morphs[2] = dom.createMorphAt(fragment,10,10,contextualElement);
        return morphs;
      },
      statements: [
        ["content","model.title",["loc",[null,[3,0],[3,15]]]],
        ["content","model.author",["loc",[null,[5,3],[5,19]]]],
        ["block","link-to",["books"],[],0,null,["loc",[null,[7,0],[7,36]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('dynamic-link-demo/templates/books', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 2
              },
              "end": {
                "line": 6,
                "column": 2
              }
            },
            "moduleName": "dynamic-link-demo/templates/books.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
            return morphs;
          },
          statements: [
            ["content","book.title",["loc",[null,[5,4],[5,18]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "dynamic-link-demo/templates/books.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          return morphs;
        },
        statements: [
          ["block","link-to",["book",["get","book",["loc",[null,[4,20],[4,24]]]]],[],0,null,["loc",[null,[4,2],[6,14]]]]
        ],
        locals: ["book"],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 0
          }
        },
        "moduleName": "dynamic-link-demo/templates/books.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Books");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","each",[["get","model",["loc",[null,[3,8],[3,13]]]]],[],0,null,["loc",[null,[3,0],[8,9]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('dynamic-link-demo/templates/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "dynamic-link-demo/templates/index.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dynamic-link-demo/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('dynamic-link-demo/tests/controllers/application.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/application.js should pass jshint', function() { 
    ok(true, 'controllers/application.js should pass jshint.'); 
  });

});
define('dynamic-link-demo/tests/helpers/resolver', ['exports', 'ember/resolver', 'dynamic-link-demo/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('dynamic-link-demo/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('dynamic-link-demo/tests/helpers/start-app', ['exports', 'ember', 'dynamic-link-demo/app', 'dynamic-link-demo/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('dynamic-link-demo/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('dynamic-link-demo/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('dynamic-link-demo/tests/routes/book.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/book.js should pass jshint', function() { 
    ok(true, 'routes/book.js should pass jshint.'); 
  });

});
define('dynamic-link-demo/tests/routes/books.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/books.js should pass jshint', function() { 
    ok(true, 'routes/books.js should pass jshint.'); 
  });

});
define('dynamic-link-demo/tests/routes/index.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/index.js should pass jshint', function() { 
    ok(true, 'routes/index.js should pass jshint.'); 
  });

});
define('dynamic-link-demo/tests/test-helper', ['dynamic-link-demo/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('dynamic-link-demo/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('dynamic-link-demo/tests/unit/controllers/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:application', {});

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('dynamic-link-demo/tests/unit/controllers/application-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/application-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/application-test.js should pass jshint.'); 
  });

});
define('dynamic-link-demo/tests/unit/routes/book-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:book', 'Unit | Route | book', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('dynamic-link-demo/tests/unit/routes/book-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/book-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/book-test.js should pass jshint.'); 
  });

});
define('dynamic-link-demo/tests/unit/routes/books-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:books', 'Unit | Route | books', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('dynamic-link-demo/tests/unit/routes/books-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/books-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/books-test.js should pass jshint.'); 
  });

});
define('dynamic-link-demo/tests/unit/routes/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index', 'Unit | Route | index', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('dynamic-link-demo/tests/unit/routes/index-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/index-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/index-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('dynamic-link-demo/config/environment', ['ember'], function(Ember) {
  var prefix = 'dynamic-link-demo';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("dynamic-link-demo/tests/test-helper");
} else {
  require("dynamic-link-demo/app")["default"].create({"name":"dynamic-link-demo","version":"0.0.0+08cb6cd2"});
}

/* jshint ignore:end */
//# sourceMappingURL=dynamic-link-demo.map