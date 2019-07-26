# remote-data in TypeScript



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
