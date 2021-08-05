SELECT
	COUNT(*) AS `n`,
    sp.vegetarian AS `vege`,
    SUM(IF(LOCATE('0.0', sp.appdetail) > 0, 1, 0)) AS `CV`,
    SUM(IF(LOCATE('1.0', sp.appdetail) > 0, 1, 0)) AS `PS`,
    SUM(IF(LOCATE('1.1', sp.appdetail) > 0, 1, 0)) AS `PO`,
    SUM(IF(LOCATE('1.2', sp.appdetail) > 0, 1, 0)) AS `PV`,
    SUM(IF(LOCATE('2.0', sp.appdetail) > 0, 1, 0)) AS `SS`,
    SUM(IF(LOCATE('2.1', sp.appdetail) > 0, 1, 0)) AS `SO`,
    SUM(IF(LOCATE('2.2', sp.appdetail) > 0, 1, 0)) AS `SV`,
    SUM(IF(LOCATE('3.0', sp.appdetail) > 0, 1, 0)) AS `NS`,
    SUM(IF(LOCATE('3.1', sp.appdetail) > 0, 1, 0)) AS `NO`
FROM
	sam_prihlasky sp
WHERE
	year = 2021
GROUP BY
    sp.vegetarian