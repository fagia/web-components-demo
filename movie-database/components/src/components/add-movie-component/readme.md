# add-movie-component

The `add-movie-component` is responsible for rendering the form to create new movies.

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                             | Type      | Default     |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `allowCancel` | `allow-cancel` | Optional property that allows to control whether the form's cancel button has to be rendered or not.    | `boolean` | `false`     |
| `mode`        | `mode`         | Optional property that allows to define the styling of the component. Possible values: `blue`, `green`. | `string`  | `'default'` |


## Events

| Event                   | Description                                                   | Type                 |
| ----------------------- | ------------------------------------------------------------- | -------------------- |
| `movieCreated`          | Events emitted at every successful movie creation.            | `CustomEvent<Movie>` |
| `movieCreationCanceled` | Event emitted everytime the user clicks on the cancel button. | `CustomEvent<never>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
