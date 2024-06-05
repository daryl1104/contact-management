use contact_manager;

CREATE TABLE user (
    id INT PRIMARY KEY auto_increment,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);


CREATE TABLE contact (
    id INT PRIMARY KEY auto_increment,
    name VARCHAR(100)NOT NULL ,
    phone_number VARCHAR(100) NOT NULL,
	wechat VARCHAR(100),
	qq VARCHAR(100),
	email VARCHAR(100),
	address VARCHAR(100),
	gender INT NOT NULL,
	user_id INT NOT NULL,
	group_id INT,
	foreign key(user_id) references user(id)
);


create table cgroup (
	id  int PRIMARY KEY auto_increment,
	name VARCHAR(100) NOT NULL,
	user_id INT NOT NULL,
	foreign key(user_id) references user(id)
);

-- create table cgroup_contact (
-- 	id  int PRIMARY KEY auto_increment,
-- 	cgroup_id int NOT NULL,
-- 	contact_id int NOT NULL,
-- 	foreign key(cgroup_id) references cgroup(id),
-- 	foreign key(contact_id) references contact(id)
-- );