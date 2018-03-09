# 移动端日期选择插件

#### 使用
  ```
    // html
    <input id="demo1" type="text" readonly="" name="input_date" placeholder="日期选择特效" data-lcalendar="2017-01-01,2019-12-31"/>

    // js
    var calendar = new lCalendar();
		calendar.init({
			'trigger': '#demo1',
			'type': 'date'
		});
  ```