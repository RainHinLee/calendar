基本用法

--------------------

```
	//---实例化对象
	import Calendar from 'calendar';

	let calendar = new Calendar();
	
```

方法

------------------

* setDate(date) : 设置日历日期；
* getDate() : 返回month加1后的日历日期对象

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
* cache() : 缓存当前日期数据
* restore() : 恢复缓存的日期数据

```
	let date = calendar.prevDate(); //--获取上个月对象
	calendar.cache()  //---保存当前日期
	calendar.setDate(date);
	console.log(calendar.getDate())
	calendar.restore() //--恢复到之前的日期
	console.log(calendar.getDate());


```
* now() : 当前时间戳
* size() : 日历天数
* week() : 当前日星期
* firstWeek() : 日历的第一个星期
* lastWeek() : 日历的最后一个星期



