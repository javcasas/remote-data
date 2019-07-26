# remote-data in TypeScript

See [Constructing a Generic Data Loader Component with good typechecking in Typescript](https://www.javiercasas.com/articles/constructing-generic-loader-component/)



### Usage

```typescript
const CommentsSection = () =>
  <RemoteData
    dataFetcher={() => request(...)}
    notAskedUI={<div>No data has been fetched yet</div>}
    loadingUI={<div>Loading comments...</div>}
    failureUI={(error) => <div>An error happened loading data: {error}</div>}
    successUI={(comments) => <ul>{ comments.map(comment => <li>{comment}</li>) }</ul>}
    />
```
