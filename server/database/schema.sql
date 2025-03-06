create table user (
  id int primary key auto_increment not null,
  name varchar(260) not null,
  email varchar(80) not null,
  hashed_password varchar(260) not null,
  picture text not null,
  location text not null
);

create table service_category (
  id int primary key auto_increment not null,
  name varchar(80) not null
);

create table donation_category (
  id int primary key auto_increment not null,
  name varchar(80) not null
);

create table donation_condition (
  id int primary key auto_increment not null,
  name varchar(80) not null
);

create table donation (
  id int primary key auto_increment not null,
  title varchar(260) not null,
  description text not null,
  date DATETIME not null,
  picture text not null,
  user_id int not null,
  condition_id int not null,
  category_id int not null,
  foreign key(user_id) references user(id),
  foreign key(condition_id) references donation_condition(id),
  foreign key(category_id) references donation_category(id)
);

create table service (
  id int primary key auto_increment not null,
  title varchar(260) not null,
  date DATETIME  not null,
  description text not null,
  category_id int not null,
  user_id int not null,
  foreign key(category_id) references service_category(id),
  foreign key(user_id) references user(id)
);

create table rating (
  id int primary key auto_increment not null,
  points float not null,
  user_id int not null,
  foreign key(user_id) references user(id)
);

insert into donation_category (id, name)
values 
  (1, "alimentaire"),
  (2, "produits d'hygiène"),
  (3, "vêtements"),
  (4, "jouets"),
  (5, "electroménager"),
  (6, "meuble"),
  (7, "produits pour bébé"),
  (8, "informatique");

insert into service_category (id, name)
values 
  (1, "bricolage"),
  (2, "aide aux courses"),
  (3, "garde d'animaux de compagnie"),
  (4, "garde d'enfants"),
  (5, "soutien aux personnes isolées"),
  (6, "enseignement");

insert into donation_condition (id, name)
values 
  (1, "neuf sous emballage d'origine"),
  (2, "état neuf"),
  (3, "très bon état"),
  (4, "bon état"),
  (5, "satisfaisant");
