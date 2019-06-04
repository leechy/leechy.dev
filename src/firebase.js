import firebaseConfig from './firebase-config.js';

const dbHost = 'https://firestore.googleapis.com/v1/';
const dbUri = `projects/${firebaseConfig.projectId}/databases/(default)/documents/`;

const defaultOrder = 'orderBy=date+desc&';

export function getFirestoreRequestUrl(collection, docId = '') {
  const order = docId !== '' ? '' : defaultOrder;
  return `${dbHost}${dbUri}${collection}/${docId}?${order}key=${firebaseConfig.apiKey}`;
}

export function parseFirestoreResults(docs) {
  // extract the values
  function getValue(field) {
    if (field.mapValue) {
      const mapFields = {};
      Object.keys(field.mapValue.fields).forEach(name => {
        mapFields[name] = getValue(field.mapValue.fields[name]);
      });
      return mapFields;
    } else if (field.arrayValue) {
      return field.arrayValue.values.map(item => getValue(item));
    } else {
      return Object.values(field)[0];
    }
  }

  // iterate the document fields
  function getValues(data) {
    const fields = {};
    Object.keys(data).map(name => {
      fields[name] = getValue(data[name]);
    });
    return fields;
  }

  // iterate documents and return transformed object
  return docs.map(doc => {
    return {
      id: doc.name.substr(dbUri.length),
      ...getValues(doc.fields)
    };
  });
}
