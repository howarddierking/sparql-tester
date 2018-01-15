const rdf = require('rdflib');
const util = require('util');

const turtle = 'text/turtle';
const url = 'http://example.org/';
const data_basic = 
`<http://example.org/book/book1> <http://purl.org/dc/elements/1.1/title> "SPARQL Tutorial" .`;

const query_basic = 
`SELECT ?title
WHERE
{
	<http://example.org/book/book1> <http://purl.org/dc/elements/1.1/title> ?title .
}`;

const data_multiple = 
`@prefix foaf:  <http://xmlns.com/foaf/0.1/> .

_:a  foaf:name   "Johnny Lee Outlaw" .
_:a  foaf:mbox   <mailto:jlow@example.com> .
_:b  foaf:name   "Peter Goodguy" .
_:b  foaf:mbox   <mailto:peter@example.org> .
_:c  foaf:mbox   <mailto:carol@example.org> .`;

const query_multiple = 
`PREFIX foaf:   <http://xmlns.com/foaf/0.1/>
SELECT ?name ?mbox
WHERE
  { ?x foaf:name ?name .
    ?x foaf:mbox ?mbox . }`;


const execQuery = (data, query) => {
	// create the graph
	const store = rdf.graph();

	// populate the graph
	try {
		console.info('parsing graph data...');
		rdf.parse(data, store, url, turtle);

		console.info('executing query...');
		const q = rdf.SPARQLToQuery(query, false, store);
		store.query(q, result => {
			debugger;
			console.info(`<- - - - - - - query ran with result - - - - - - ->`);
			console.info(util.inspect(result, { colors: true, depth: null }));
		});

	} catch(err){
		console.error(err);
	}
};

// execQuery(data_basic, query_basic);

execQuery(data_multiple, query_multiple);



console.info('completed!');