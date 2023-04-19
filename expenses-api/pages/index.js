const endpointsApi = [
  {
    name: "GET /trips",
    description: "List all the trips",
  },
  {
    name: "GET /trips/:id",
    description: "Get the details of a trip",
    parameters: [
      {
        name: "id",
        description: "*required* the number that indentifies the trip",
      },
    ],
  },
  {
    name: "POST /trips",
    description: "Create a new trip",
    parameters: [
      { name: "user", description: "*required* the id of the user" },
      { name: "name", description: "*required* the name of the trip" },
      { name: "star_date", description: "(optional) the starting date" },
      { name: "end_date", description: "(optional) the end date" },
    ],
  },
  {
    name: "PUT /trips/id",
    description: "Edit a trip",
    parameters: [
      {
        name: "id",
        description: "*required* the number that indentifies the trip",
      },
      { name: "user", description: "(optional) the name of the user " },
      { name: "name", description: "(optional) the name of the trip" },
      {
        name: "start_date",
        description: "(optional) the starting date of a trip",
      },
      { name: "end_date", description: "(optional) the ending date of a trip" },
    ],
  },
  {
    name: "DELETE /trips/id",
    description: "delete a trip (and all its expenses)",
    parameters: [
      {
        name: "id",
        description: "*required* the number that indentifies the trip",
      },
    ],
  },
  {
    name: "POST /expenses",
    description: "create a new expense",
    parameters: [
      {
        name: "trip",
        description: "*required* the number that indetifies the trip",
      },
      { name: "name", description: "*required* the name of the expense" },
      { name: "date", description: "*required* the date of the expense" },
      { name: "amount", description: "*required* the amount of the expense" },
      {
        name: "currency",
        description: "*required* the currency of the expense",
      },
    ],
  },
  {
    name: "GET /expenses/id",
    description: "get the details of an expense",
    parameters: [
      {
        name: "id",
        description: "*required* the number that identifies the expense",
      },
    ],
  },
  {
    name: "PUT /expenses/id",
    description: "modify the datail of an expense",
    parameters: [
      {
        name: "id",
        description: "*required* the number that identifies the expense",
      },
      {
        name: "trip",
        description: "(optional) the number that identifies the trip",
      },
      { name: "name", description: "(optional) the name of the expense" },
      { name: "date", description: "(optional) the date of the expense" },
      { name: "amount", description: "(optional) the amount of the expense" },
      {
        name: "currency",
        description: "(optional) the currency of the expense",
      },
    ],
  },
  {
    name: "DELETE /expenses/id",
    description: "delete an expense",
    parameters: [
      {
        name: "id",
        description: "*required* the number that identifies the expense",
      },
    ],
  },
];

export default function Home() {
  return (
    <div>
      <h1 className="mt-20 text-5xl font-bold text-center">Trips API</h1>
      <h2 className="mt-10 text-2xl text-center">The documentation</h2>

      <div className="grid max-w-2xl grid-cols-2 gap-4 mx-auto mt-10">
        {endpointsApi.map((endpointsApi, index) => (
          <div className="p-5 border border-gray-300" key={index}>
            <h2>
              <code>{endpointsApi.name}</code>
            </h2>
            <p>{endpointsApi.description}</p>
            {endpointsApi.parameters && ( //the use of "&&" in react indicates if the left is true then do the right
              <div className="mt-4">
                <p>Parameters:</p>
                <ul>
                  {endpointsApi.parameters.map((parameter, index) => (
                    <li key={index}>
                      <b>{parameter.name}</b>: {parameter.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {endpointsApi.response && (
              <div className="mt-4">
                <p>Example response:</p>
                <pre>
                  <code>{endpointsApi.response}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
