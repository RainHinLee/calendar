/*
	注意事项：
		函数接受date日期对象
*/
export default class Calendar{

	constructor(date) {  
		this.date = date || new Date();
	}

	//---更改date对象
	setDate(date){  
		this.date = date;
	}

	//--获取日期对象
	getDate(){  
		let {date,suffix} = this;

		let year = date.getFullYear();
		let month = suffix(date.getMonth()+1);
		let day = suffix(date.getDate());
		let hours = suffix(date.getHours());
		let minute = suffix(date.getMinutes());
		let second = suffix(date.getSeconds());

		return {
			props:{year,month,day,hours,minute,second},
			spread:[year,month,day,hours,minute,second],
			date,
		}
	}

	//--上num个月的日期对象
	prevDate(num=1){  
		let year = this.date.getFullYear();
		let month =this.date.getMonth();
		let diff = month - num;

		year = year + Math.floor(diff / 12);
		month = diff>=0 ? diff : 12+ diff%12;

		return new Date(year,month,1)
	}

	//---下num个月的日期对象
	nextDate(num=1){  
		let year = this.date.getFullYear();
		let month =this.date.getMonth();
		let diff = month + num;

		year = year + Math.floor(diff / 12);
		month = diff%12;

		return new Date(year,month,1)
	}
	//--返回时间戳
	now(){ 
		return this.date.getTime();
	}
	//--获取月份的天数
	size(){  
		let year = this.date.getFullYear();
		let month =this.date.getMonth();

		if(month==11){
			month = 0;
			year = year+1;
		}else{
			month = month+1;
		}

		return new Date(year,month,0).getDate();
	}

	//--周期
	week(){  
		return this.date.getDay();
	}

	//--月份第一天的星期
	firstWeek(){ 
		let year = this.date.getFullYear();
		let month =this.date.getMonth();

		return new Date(year,month,1).getDay()
	}

	//--月份的最后一天的星期
	lastWeek(){  
		let year = this.date.getFullYear();
		let month = this.date.getMonth();

		if(month==11){   //---处理11数字
			month = 0;
			year = year+1;
		}else{
			month = month+1;
		}
		return new Date(year,month,0).getDay();
	}

	//--月份的日历数组,strict是否是严格模式
	days(strict=false){  
		let size = this.size(),
			len = 7,
			prevLen = this.firstWeek(),//---上个月补天数；
			nextLen = len - (this.lastWeek()+1), //--下个月补天数；
			days=[],
			result=[];

			if(strict){   //--严格模式
				this.cache(); //--缓存当前日期

				this.setDate(this.prevDate());  //---切换到上个月
				let day = this.size();
				for(let i=prevLen;i>0;i--){ //--上个月
					let value = (day - i) +1;
					days.push(value);
				}

				for(let i=1;i<=size;i++){  //---当前月
					days.push(i);
				}

				for(let i=1;i<=nextLen;i++){  //--下个月；
					days.push(i);
				}
				this.restore() //--切换回当前月
			}else{
				for(let i=0;i<prevLen;i++){ //--上个月
					days.push(0);
				};

				for(let i=1;i<=size;i++){  //---当前月
					days.push(i);
				};

				for(let i=1;i<=nextLen;i++){  //--下个月；
					days.push(0);
				}

			};
			
			while(days.length){
				result.push(days.splice(0,7));
			}			
			return result
	}

	//---获取num天数后的日期，num可以为正负，负数向前取，正向后取;返回Date对象数组
	getRelativeDates(num=0){    
		let year = this.date.getFullYear();
		let month = this.date.getMonth();
		let day = this.date.getDate();

		let diff =  this.size() - day; //--本月剩余天数
		let results = [];

		//---向后取，且在本月内 
		if(num>=0 && diff>=num){  
			for(let i=0;i<=num;i++){
				results.push(new Date(year,month,day+i))
			};
		}

		//---向前取，且在本月内 
		if(num<0 && day>=Math.abs(num)){ 
			for(let i=0;i>=num;i--){
				results.push(new Date(year,month,day+i))				
			}
		};

		//--向后取，所取超出本月范围
		if(num>=0 && num>diff){ 
			let nextLen = num-diff; //--超出本月的天数
			this.cache(); //---缓存当前日期；

			for(let i=0;i<=diff;i++){   //--添加本月
				results.push(new Date(year,month,day+i))
			};

			this.setDate(this.nextDate()); //---切换到下一个月

			while(nextLen >= this.size()){  //--大于月天数
				for(let i=0;i<this.size();i++){ 
					let year = this.date.getFullYear();
					let month = this.date.getMonth();
					results.push(new Date(year,month,i+1));
				};

				//---改变剩余长度数据，切换到下一个月
				nextLen = nextLen-this.size();
				this.setDate(this.nextDate());
			}

			if(nextLen){ //--剩余天数小于本月天数
				for(let i=0;i<nextLen;i++){   
					let year = this.date.getFullYear();
					let month = this.date.getMonth();
					results.push(new Date(year,month,i+1));
				}					
			};

			this.restore() //---恢复到当前时间
		}

		//---向前取，且所取长度超出本月范围
		if(num<0 && day<Math.abs(num)){  
			let prevLen = Math.abs(num) - day; //--超出月天数

			this.cache();

			for(let i=day;i>0;i--){   //--当前月
				results.push(new Date(year,month,i));						
			};

			this.setDate(this.prevDate()); //---切换到上一个月
			
			while(prevLen >= this.size()){  //---超出月天数
				for(var i =0;i<this.size();i++){ //---整月加入
					let year = this.date.getFullYear();
					let month = this.date.getMonth();
					results.push(new Date(year,month,this.size()-i));								
				};

				//----改变剩余长度，切换到下一个月
				prevLen = prevLen - this.size();
				this.setDate(this.prevDate()); 
			}

			//---剩余未超出月天数
			if(prevLen){
				for(var i=0;i<=prevLen;i++){ //---上个月
					let year = this.date.getFullYear();
					let month = this.date.getMonth();
					results.push(new Date(year,month,this.size()-i));	
				}
			}
			this.restore()  //---恢复到当前时间
		};

		return results
	}

	//---获取num为天数，type可以为'day','month','year';
	getRelativeDate(num,type='day'){
		let days = 0;

		if(type=='year'){ //--年转化为月
			num *= 12;
			type = 'month'
		}

		switch(type){
			case "day":
				days = num;
				break
			case "month": 
				this.cache();
				while(num){
					if(num>0){
						this.setDate(this.nextDate());
						days+= this.size();
						num--;
					}else{
						this.setDate(this.prevDate());
						days -= this.size();
						num++;
					}
				}
				this.restore();
				break;
		};

		let array = this.getRelativeDates(days);  //---返回天数
		let start = array[0], end = array[array.length-1];
		let result= {};

		this.cache(); //--缓存数据
		this.setDate(start);
		result['start'] = this.getDate();
		this.setDate(end);
		result['end'] = this.getDate();
		this.restore(); //---恢复数据

		return result;
	}

	getDiffByDate(date){  //---获取两个日期之间的差值天数
		var times = date.getTime() - this.now();
		var size = 24 * 60 * 60 * 1000;
		return Math.ceil(times / size);		
	}

	cache(){  //--缓存当前时间，以便切换日期
		this.cacheDate = this.date
	}

	restore(){  //--恢复当当前时间
		this.setDate(this.cacheDate)
	}

	format(str='-'){  //---日期字符串表示,str分隔符
		let {spread} = this.getDate();
		return `${spread.slice(0,3).join(str)} ${spread.slice(3,6).join(':')}`;
	}

	suffix(num){  //---小于10的月份和日期添加0前缀
		if(num<10){
			num = 0+''+Number(num)
		}
		return num
	}
}