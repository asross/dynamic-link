# Dynamic-link

Ember CLI addon for the `dynamic-link` component, a more flexible version of `link-to`.

## Installation

To install simply run:
```
ember install dynamic-link
```

## Usage

`dynamic-link` allows you to generate links based on dynamic parameters, which may trigger ember route transitions, ember actions, or normal URL transitions.

You can pass in these parameters directly:
```hbs
{{dynamic-link route='todos.index'}}
{{dynamic-link route='todos.show' model=todo}}
{{dynamic-link route=dynamicRoute model=possiblyNullDynamicModel queryParams=possiblyNullDynamicQueryParams}}
{{dynamic-link action=dynamicAction}}
{{dynamic-link href=literalHref title=literalTitle}}
```

Or you can pass them in via a `params` object:

```js
export default Ember.Controller.extend({
  linksParams: Ember.computed('model', 'someProperty', function() {
    return [{
      route: "todos."+(@get('model') ? 'show' : 'index'),
      text: "View "+(@get('model') ? "todo" || "all todos"),
      model: @get('model'),
      queryParams: { foo: 'bar' }
    }, {
      href: 'http://some.site',
      text: 'Buy product'
    }, {
      action: 'toggleSomeProperty',
      className: 'switch',
      text: "Turn it "+(@get('someProperty') ? "off" : "on")
    }];
  });
});
```

```hbs
{{#each params in linkParams}}
  {{#dynamic-link params=linkParams}}
    {{linkParams.text}}
  {{/dynamic-link}}
{{/each}}
```

Which should produce (assuming `model` is truthy and `someProperty` is not):

```html
<a href="/todos/1?foo=bar">View todo</a>
<a href="http://some.site">Buy product</a>
<a href="#" class="switch">Turn it on</a>
```

Clicking on the route-based link will perform an Ember route transition without refreshing the page, clicking on the action link will bubble the action properly, and clicking on the literal link will work normally.

## Running Tests

* `git clone git@github.com:asross/dynamic-link.git`
* `npm install`
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
