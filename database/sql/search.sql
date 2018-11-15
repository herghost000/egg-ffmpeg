EXPLAIN SELECT
	`video_list`.`id`,
	`video_list`.`name`,
	`video_list`.`type_id`,
	`video_list`.`surface_plot`,
	`video_list`.`video_url`,
	`video_list`.`decode_id`,
	`video_list`.`dsc`,
	`video_list`.`created_at`,
	`video_list`.`updated_at`,
	`video_type`.`id` AS `video_type.id`,
	`video_type`.`name` AS `video_type.name`,
	`video_type`.`created_at` AS `video_type.created_at`,
	`video_type`.`updated_at` AS `video_type.updated_at`,
	`video_decode`.`id` AS `video_decode.id`,
	`video_decode`.`url` AS `video_decode.url`,
	`video_decode`.`status_id` AS `video_decode.status_id`,
	`video_decode`.`created_at` AS `video_decode.created_at`,
	`video_decode`.`updated_at` AS `video_decode.updated_at`,
	`video_decode->video_decode_statu`.`id` AS `video_decode.video_decode_statu.id`,
	`video_decode->video_decode_statu`.`name` AS `video_decode.video_decode_statu.name`,
	`video_decode->video_decode_statu`.`created_at` AS `video_decode.video_decode_statu.created_at`,
	`video_decode->video_decode_statu`.`updated_at` AS `video_decode.video_decode_statu.updated_at` 
FROM
	`video_lists` AS `video_list`
	LEFT OUTER JOIN `video_types` AS `video_type` ON `video_list`.`type_id` = `video_type`.`id`
	LEFT OUTER JOIN `video_decodes` AS `video_decode` ON `video_list`.`decode_id` = `video_decode`.`id`
	LEFT OUTER JOIN `video_decode_status` AS `video_decode->video_decode_statu` ON `video_decode`.`status_id` = `video_decode->video_decode_statu`.`id` 
WHERE
	`video_list`.`name` LIKE '%%' 
ORDER BY
	`video_list`.`id` DESC 
	LIMIT 0,
	10;