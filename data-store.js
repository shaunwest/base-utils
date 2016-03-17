export const createDataStore = (immutable = true) => ({
  state: {},
  topics: {},
  immutable
});

export const createSub = _dataStore => 
  (topic, fn) =>
    _dataStore.topics = Object.assign(
      {},
      _dataStore.topics,
      {
        [topic]: [fn, ...(_dataStore.topics[topic] || [])]
      }
    );

const saveImmutable = (topic, topics, dataStore, values) => {
  if (topic in topics) {
    for (let fn of topics[topic])
      dataStore.state = fn.call(null, dataStore.state, ...values);
    return true;
  }
  return false;
}

const saveMutable = (topic, topics, state, values) => {
  if (topic in topics) {
    for (let fn of topics[topic])
      fn.call(null, state, ...values);
    return true;
  }
  return false;
}

export const createPub = _dataStore =>
  (topic, ...values) =>
    _dataStore.immutable ?
      saveImmutable(topic, _dataStore.topics, _dataStore, values) :
      saveMutable(topic, _dataStore.topics, _dataStore.state, values); 
