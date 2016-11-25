基本用法

--------------------

```
	import Calendar from 'calendar';

	let calendar = new Calendar();
	let days = calendar.days(); 
	
```

方法

------------------

* setDate(date) : 设置日历日期；
* getDate() : 获取日历对象，返回month加1后的日期对象

```	
	let date = calendar.getDate();
	console.log(date);

	{
		props:{year,month,day,hours,minute,second}, //---对象形式
		spread:[year,month,day,hours,minute,second], //---数组形式
		date: date //--日期对象
	}

```
* prevDate(num) : 获取num月前的日期对象
* nextDate(num) : 获取num月后的日期对象
* cache() : 获取当前日期数据
* restore() : 恢复缓存的日期数据

```
	let date = calendar.prevDate(); //--获取上个月对象
	calendar.cache()  //---保存当前日期
	calendar.setDate(date);
	calendar.getDate()
	calendar.restore() //--恢复到之前的日期
	calendar.getDate();


```
now() : 当前时间戳
size() : 日历天数
week() : 当前星期
firstWeek() : 日历的第一个星期
lastWeek() : 日历的最后一个星期



