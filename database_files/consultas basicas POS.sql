select * from  `POS`.`product`;
select * from  `POS`.`user`;

select 	p.id,
		p.code,
		p.short_description,
		p.price,
		c.name categoria,
		m.name marca,
		s.name estado
from 	product p,
		category c,
		mark m,
        state s
where 	p.id_category = c.id
and 	p.id_mark=m.id
and 	p.id_state=s.id;


select 	*
from  	user u,
		role r
where 	u.id_role=r.id;