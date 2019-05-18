const esClient = require('elasticsearch');

class ElasticSearch {

    async fetchUsers (index, type, queryString) {
        let result = await esClient.search({ index: index, type: type, q: queryString });
            console.log('--->', result);
        }
};

module.exports = new ElasticSearch();