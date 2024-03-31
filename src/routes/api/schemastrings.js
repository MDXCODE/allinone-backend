// made this just because typing out the schemaname was annoying

var usersSchema = `"allinone-userschema"."users"`
var tasksSchema = `"allinone-userschema"."tasks"`
//var tasksSchema = `"allinone-userschema"."events"`
//var tasksSchema = `"allinone-userschema"."notes"`

module.exports = {
    usersSchema: usersSchema,
    tasksSchema: tasksSchema
};