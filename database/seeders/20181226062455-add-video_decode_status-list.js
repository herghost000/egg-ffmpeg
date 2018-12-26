'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const list = [];
    const types = [ '转码中', '转码完成', '切片中', '切片完成', '转码错误', '切片错误' ];
    for (let i = 1; i <= 6; i++) {
      list.push({
        id: i,
        name: types[i - 1],
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    return queryInterface.bulkInsert('video_decode_status', list, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
