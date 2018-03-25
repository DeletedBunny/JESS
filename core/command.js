class Command {
    constructor(client, {
      name = null,
      description = "The description of the command.",
      perms = "User",
    }) {
      this.client = client;
      this.perms = perms;
    }
  }
  module.exports = Command;