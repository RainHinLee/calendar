基本用法

--------------------

```
	//---实例化对象
	import Calendar from 'calendar';
	let calendar = new Calendar(new Date(),"+8:00");

	//---无参数，默认使用当前时间；
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
* setTimezone(str) : 设置时区 "+8:00"; "-8:00";
* getTimezone() : 返回时区;
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
* days(Boolean strict) : 返回按照以周为单位进行分割的二位数组;strict超出本月的日期是否返回实际的日期，默认返回0;内部数组的序列号对应的是week中的0-6;即：星期天-星期一

```
	let days = calendar.days();

	console.log(days);

	[
		[0,1,2,3,4,5,6],
		[7,8,9,10,11,12,13],
		[14,15,16,17,18,19,20],
		[21,22,23,24,25,26,27],
		[28,29,30,31,0,0,0],
	]


```
* getRelativeDate(num,type) : 获取相对当前时间num(正向后，负向前)长度的日期对象；type包含"day","week","month","year";

```
	let date = calendar.getRelativeDate(1,'month');

	console.log(date);

	{
		props:{},
		spread:[],
		date : date

	}

```

* getRelativeDates(num,type) : 获取相对当前时间num(正向后，负向前)长度的日期对象数组；type包含"day","week","month","year";

```
	let date = calendar.getRelativeDates(1,'month');

	console.log(date);

	[date1,date2,date3,date4,......];


```

* getDiffByDate(date) : 获取两个日期的天数差；返回数据

```
	let date = calendar.getDiffByDate(1,'month');

	console.log(calendar.getDiffByDate(date.date));
	
	输出：31

```

* transformTimezone(timezone) : 转化为timezone时区的日历；

* format(str) : 返回str连接的时间字符串 "2016-05-08 21:00:00";

* suffix(num) : 对小于10的数字加上前缀返回字符串：

```
	console.log(calendar.suffix(5)) // '05';
 
```
