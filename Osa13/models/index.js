const Blog = require('./Blog')
const User = require('./User')
const ReadingList = require('./ReadingList') 
const Session = require('./Session')

Blog.belongsTo(User, {
    foreignKey: 'author',
    targetKey: 'name', // Indicates the target key to which the foreign key references
  });
  
  User.hasMany(Blog, {
    foreignKey: 'author',
    sourceKey: 'name', // Indicates the source key to which the foreign key references
  });

User.belongsToMany(Blog, {
    through: ReadingList, 
    foreignKey: 'userId', 
    as: 'readings'
  });
Blog.belongsToMany(User, {
    through: ReadingList, 
    foreignKey: 'blogId',
    as: 'readings' 
  });

Session.belongsTo(User, { foreignKey: 'userId' });


Blog.sync({ alter: true })
User.sync({ alter: true })
ReadingList.sync({ alter: true });
Session.sync({ alter: true  })



module.exports = {
    Blog,
    User,
    ReadingList,
    Session
}