import { fetchWrapper } from "../helpers/fetch-wrapper";

export const dbCSService = {
  getDBNames,
  delete: _delete,
  saveDBConnection,
  getAiResponse
};

// retrieves stored database names associated with signed in user
async function getDBNames(baseUrl) {
  return await fetchWrapper.get(`${baseUrl}/cs/getall`);
}

async function _delete(baseUrl, id) {
  return await fetchWrapper.delete(`${baseUrl}/cs/delete/${id}`);
}

async function saveDBConnection(baseUrl, data) {
  const cs = {
    id: uuidv4(),
    dbName: data.csStringName,
    dbType: data.dropdown,
    dbConnectionString: `host=${data.host}; port=${data.port}; database=${data.dbName}; user id=${data.dbUserId}; password=${data.cspassword};`,
    userId: uuidv4(),
  };
  return await fetchWrapper.post(`${baseUrl}/cs/create`, cs);
}

async function getAiResponse(baseUrl, prompt, rowsToRetrieve, dbId) {
  if (prompt === "") {
    prompt = "empty prompt";
  }
  return await fetchWrapper.post(`${baseUrl}/ai/summarize`, {
    DatabaseConnectionId: dbId,
    DataRetrievalSelection: rowsToRetrieve,
    Prompt: prompt,
  });
}

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
