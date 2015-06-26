# Dynamic-link

`dynamic-link` is an alternative to the `link-to` helper that provides more flexibility for dynamic parameters, including actions and literal hrefs.

## Installation

To install, run:
```
ember install dynamic-link
```

## Usage

`dynamic-link` accepts parameters for `route`, `action`, `model`, `models`, `queryParams`, and `href`. It uses these parameters to generate the `<a>` tag's href and determine what happens when it is clicked.

It also supports the html attributes `title`, `rel`, `target`, and `class` either directly or via `className`.

This is helpful, for example, when implementing breadcrumbs or navbars, with lists of links that freely mix Ember routes, actions, and literal hrefs:

```js
// .js
export default Ember.Controller.extend({
  editMode: false,
  currentUser: null,

  linkBar: Ember.computed('editMode', 'currentUser', function() {
    if (this.get('editMode')) {
      return [
        { action: 'cancelEdit', className: 'cancel-link', text: 'Cancel' },
        { action: 'saveChanges', className: 'submit-link', text: 'Done' }
      ];
    } else {
      return [{
        href: 'https://corporate-site.com',
        target: '_blank',
        text: 'Home'
      }, {
        route: this.get('currentUser') ? 'user.edit' : 'sign-in',
        model: this.get('currentUser'),
        text: this.get('currentUser') ? 'Edit Profile' : 'Sign In',
        queryParams: this.get('currentUser') ? null : { foo: 'bar' }
      }];
    }
  })
});
```

```hbs
{{!-- .hbs --}}
{{#each linkParams in linkBar}}
  {{#dynamic-link params=linkParams}}
    {{linkParams.text}}
  {{/dynamic-link}}
{{/each}}
```

Which would produce either

```html
<a href='#' class='cancel-link'>Cancel</a>
<a href='#' class='submit-link'>Done</a>
```

if `editMode` was true, or

```html
<a href='https://corporate-site.com' target='_blank'>Home</a>
<a href='/users/1/edit'>Edit Profile</a>
```

if `currentUser` was present (with an `id` of 1), or

```html
<a href='https://corporate-site.com' target='_blank'>Home</a>
<a href='/sign_in?foo=bar'>Sign In</a>
```

if not.

Clicking on route-based links will perform Ember route transitions without refreshing the page, clicking action links will bubble actions properly, and clicking on literal links will as normal.

### Passing Params Directly

Note that in addition to being able to pass all of these parameters in via the `params` hash, you can also pass them in directly:

```
{{dynamic-link route=someRoute model=someModel queryParams=someQueryParams}}
```

If any of the parameters are falsey, they will be ignored.

### Multiple Dynamic Segments

You can use `dynamic-link` with multiple dynamic segments by passing in a list of models and/or ids to `models` or `params.models`. For example,

```js
export default Ember.Controller.extend({
  modelChain: Ember.computed('photo', 'comment', 'reply', {
    return [this.get('photo'), this.get('comment'), this.get('reply')];
  });
});
```

```hbs
{{#dynamic-link route='photo.comment.reply' models=modelChain}}
  View Reply
{{/dynamic-link}}
```

might produce

```html
<a href="/photos/1/comments/2/replies/3">View Reply</a>
```

## Running Tests

* `git clone git@github.com:asross/dynamic-link.git`
* `npm install`
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
