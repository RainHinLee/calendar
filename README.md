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


