'use strict'
import React from 'react'

type RemoteDataADT<E, A> =
  | {
      type: 'NotAsked'
    }
  | {
      type: 'Loading'
    }
  | {
      type: 'Failure'
      error: E
    }
  | {
      type: 'Success'
      value: A
    }

type NotAskedUI = JSX.Element
type LoadingUI = JSX.Element
type FailureUI<E> = (error: E) => JSX.Element
type SuccessUI<A> = (value: A) => JSX.Element
type DataFetcher<E, A> = () => Promise<A>

interface Props<E, A> {
  notAskedUI: NotAskedUI
  loadingUI: LoadingUI
  failureUI: FailureUI<E>
  successUI: SuccessUI<A>
  dataFetcher: DataFetcher<E, A>
}

interface State<E, A> {
  data: RemoteDataADT<E, A>
}

class RemoteData<E, A> extends React.Component<Props<E, A>, State<E, A>> {
  constructor(props: Props<E, A>) {
    super(props)
    this.state = {
      data: { type: 'NotAsked' }
    }
  }
  componentDidMount() {
    this.setState({ data: { type: 'Loading' } })
    this.props
      .dataFetcher()
      .then(value => this.setState({ data: { type: 'Success', value } }))
      .catch(error => this.setState({ data: { type: 'Failure', error } }))
  }
  render() {
    const data = this.state.data
    if (data.type === 'NotAsked') {
      return this.props.notAskedUI
    } else if (data.type === 'Loading') {
      return this.props.loadingUI
    } else if (data.type === 'Failure') {
      return this.props.failureUI(data.error)
    } else if (data.type === 'Success') {
      return this.props.successUI(data.value)
    }
  }
}

export default RemoteData
