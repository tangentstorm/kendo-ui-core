<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<script src="<%: Url.Content("~/content/web/globalization/cultures/kendo.culture.en-US.js") %>"></script>
<script src="<%: Url.Content("~/content/web/globalization/cultures/kendo.culture.en-GB.js") %>"></script>
<script src="<%: Url.Content("~/content/web/globalization/cultures/kendo.culture.de-DE.js") %>"></script>
<script src="<%: Url.Content("~/content/web/globalization/cultures/kendo.culture.fr-FR.js") %>"></script>
<script src="<%: Url.Content("~/content/web/globalization/cultures/kendo.culture.bg-BG.js") %>"></script>

<div id="product-view" class=" demo-section k-header">
    <div class="right">
        <label for="culture">Choose culture:</label>
        <%: Html.Kendo().DropDownList()
            .Name("culture")
            .Items(items =>
            {
                items.Add().Text("bg-BG").Value("bg-BG");
                items.Add().Text("de-DE").Value("de-DE");
                items.Add().Text("en-US").Value("en-US").Selected(true);
                items.Add().Text("en-GB").Value("en-GB");
            })
            .Events(e => e.Change("changeCulture"))
        %>
    </div>
    <h2>Product promotion</h2>
    <ul id="fieldlist">
        <li>
            <label for="startDate">Discount start date:</label>
            <%: Html.Kendo().DatePicker()
                  .Name("startDate")
                  .Events(e => e.Change("startDateChange"))
            %>
            <%: Html.Kendo().TimePicker().Name("startTime").Value("12:00 AM") %>
        </li>
        <li>
            <label for="endDate">Discount end date:</label>

            <%: Html.Kendo().DatePicker()
                  .Name("endDate")
                  .Events(e => e.Change("endDateChange"))
            %> 
            <%: Html.Kendo().TimePicker().Name("endTime").Value("12:00 AM") %>
        </li>
        <li>
            <label for="initial">Initial price:</label>
            <%: Html.Kendo().NumericTextBox().Name("initial").Format("c").Value(10).Min(1) %>
        </li>
        <li>
            <label for="discount">Discount:</label>
            <%: Html.Kendo().NumericTextBox().Name("discount").Format("p").Value(0.05).Min(0).Max(0.5).Step(0.01) %>
        </li>
    </ul>
</div>
<script>
    var startDate;
    var endDate;
    var startTime;
    var endTime;
    var initial;
    var discount;

    function startDateChange() {
        var date = startDate.value();

        if (date) {
            date = new Date(date);
            date.setDate(date.getDate() + 1);
            endDate.min(date);
        }
    }

    function endDateChange() {
        var date = endDate.value();

        if (date) {
            date = new Date(date);
            date.setDate(date.getDate() - 1);
            startDate.max(date);
        }
    }

    function changeCulture() {
        kendo.culture(this.value());

        var datePickerOptions = {
            format: kendo.culture().calendar.patterns.d
        };

        var timePickerOptions = {
            format: kendo.culture().calendar.patterns.t
        };

        startDate.setOptions(datePickerOptions);
        endDate.setOptions(datePickerOptions);

        startTime.setOptions(timePickerOptions);
        endTime.setOptions(timePickerOptions);

        initial.value(initial.value());
        discount.value(discount.value());
    }

    $(function () {
        startDate = $("#startDate").data("kendoDatePicker");
        endDate = $("#endDate").data("kendoDatePicker");

        startTime = $("#startTime").data("kendoTimePicker");
        endTime = $("#endTime").data("kendoTimePicker");

        initial = $("#initial").data("kendoNumericTextBox");
        discount = $("#discount").data("kendoNumericTextBox");

        var today = new Date();

        startDate.value(today);
        endDate.min(today);

        today = new Date(today);
        today.setDate(today.getDate() + 1);

        endDate.value(today);
        startDate.max(today);
    });
</script>
<style>
    #example h2 {
        padding: 5px 0 15px;
        font-weight: normal;
        border-bottom: 1px solid rgba(128,128,128,.3);
    }

    #product-view {
        overflow: hidden;
        width: 600px;
        padding: 20px 20px 0 20px;
        margin: 30px auto;
        background-position: 0 -255px;
    }

    .right {
        float: right;
    }

    #fieldlist {
        width: 100%;
        float: left;
        margin: 0;
        padding: 10px 0 30px 0;
    }

    #fieldlist li {
        list-style: none;
        padding: 5px 0;
    }

    #fieldlist label {
        display: inline-block;
        width: 140px;
        text-align: right;
    }
</style>
</asp:Content>
