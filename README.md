# date-time-picker-util

React native date-time-picker

Displays date-time-picker using the native platform UI. iOS picker modal UI can be customized using the `pickerContainerStyleIOS` prop. Android picker UI is in **spinner** form.

Also supports minimum date/time on Android.

## Usage

```javascript
import DateTimePickerModal from "date-time-picker-util";

<DateTimePickerModal
  isVisible={this.state.iosDatePickerVisible}
  minimumDate={this.state.minimumDate}
  date={this.state.selectedDate}
  isDarkModeEnabled={false}
  onConfirm={(date) => {
    this.setDate(date);
  }}
  mode="datetime"
  onCancel={() => {
    this.setState({ iosDatePickerVisible: !this.state.iosDatePickerVisible });
  }}
/>;
```

## **Other Properties:**

**iOS-only**

| **Property**      | **Type** | **Default**   |
| ----------------- | -------- | ------------- |
| cancelTextIOS     | string   | 'Cancel'      |
| confirmTextIOS    | string   | 'Confirm'     |
| headerTextIOS     | string   | 'Pick a date' |
| modalPropsIOS     | obj      | {}            |
| date              | Date     | new Date()    |
| isDarkModeEnabled | boolean  | undefined     |
| isVisible         | boolean  | false         |

**Android-only**
