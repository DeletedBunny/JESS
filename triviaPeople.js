module.exports = {
    //suppose to hold the people playing trivia to prevent spam of trivia command from people already in a trivia game
    triviaPeople : [],
    addPerson : function(person) {
        this.triviaPeople.push(person);
    }
};