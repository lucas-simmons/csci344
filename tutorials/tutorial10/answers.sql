-- Exercise 1 (done for you): Selecting all columns
SELECT * FROM users;

-- Exercise 2 (done for you): Selecting some columns
SELECT id, first_name, last_name 
FROM users;

-- Exercise 3: Sorting
select id, first_name, last_name
from users
order by last_name;

-- Exercise 4: Filtering
select id, user_id, image_url
from posts
where user_id=26;

-- Exercise 5: Filtering with logical operators
select id, user_id, image_url
from posts
where user_id=26 or user_id=12;

-- Exercise 6: Using functions in a select statement
select count(*)
from posts;

-- Exercise 7: Aggregating data
select user_id, count(*)
from posts
group by user_id;

-- Exercise 8: Joining: two tables
select posts.id, posts.image_url, posts.user_id
from posts
join users on posts.user_id = users.id
where users.first_name in ('Nicholas', 'Rebecca');

-- Exercise 9: More joining practice: two tables
select posts.id, posts.pub_date, following.following_id
from posts
join  following on posts.user_id = following.following_id
where following.user_id=26;

-- Exercise 10: More joining practice: three tables (Optional)


-- Exercise 11: Inserting records
insert into
bookmarks (user_id, post_id, timestamp)
values (26, 219, current_timestamp);
insert into
bookmarks (user_id, post_id, timestamp)
values (26, 220, current_timestamp);
insert into
bookmarks (user_id, post_id, timestamp)
values (26, 221, current_timestamp);

-- Exercise 12: Deleting records
delete from bookmarks where post_id=219 or post_id=220 or post_id=221;

-- Exercise 13: Updating records
update users set email = 'knick2022@gmail.com' where id = 26;

-- Exercise 14: More Querying Practice (Optional)
