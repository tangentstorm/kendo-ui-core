(function() {
    var sheet;
    var defaults = kendo.ui.Spreadsheet.prototype.options;
    var SheetDataSourceBinder = kendo.spreadsheet.SheetDataSourceBinder;
    var success = $.proxy(ok, null, true);
    var failure = $.proxy(ok, null, false);

    module("Sheet DataSource binding", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(defaults.rows, defaults.columns,
            defaults.rowHeight, defaults.columnWidth);
        }
    });

    test("creates DataSource instance from the datasource options", function() {
        var binder = new SheetDataSourceBinder({
            dataSource: {
                data: [{ foo: 1 }],
            },
            sheet: sheet
        });

        ok(binder.dataSource instanceof kendo.data.DataSource);
    });

    test("DataSource instance", function() {
        var dataSource = new kendo.data.DataSource({
            data: [{ foo: 1 }]
        });

        var binder = new SheetDataSourceBinder({
            dataSource: dataSource,
            sheet: sheet
        });

        deepEqual(binder.dataSource, dataSource);
    });

    test("dataSource is automatically fetched", function() {
        var binder = new SheetDataSourceBinder({
            dataSource: {
                data: [{ foo: 1 }]
            },
            sheet: sheet
        });

        equal(binder.dataSource.view()[0].foo, 1);
    });

    test("populates the sheet with DataSource values", function() {
        var binder = new SheetDataSourceBinder({
            dataSource: {
                data: [
                    { foo: "foo1", bar: "bar1" },
                    { foo: "foo2", bar: "bar2" },
                    { foo: "foo3", bar: "bar3" }
                ]
            },
            sheet: sheet
        });

        equal(sheet.range("A1").value(), "foo1");
        equal(sheet.range("B1").value(), "bar1");
        equal(sheet.range("A2").value(), "foo2");
        equal(sheet.range("B2").value(), "bar2");
        equal(sheet.range("A3").value(), "foo3");
        equal(sheet.range("B3").value(), "bar3");
    });

    test("binds to specific columns", function() {
        var binder = new SheetDataSourceBinder({
            columns: [
                { field: "bar" }
            ],
            dataSource: {
                data: [
                    { foo: "foo1", bar: "bar1" },
                    { foo: "foo2", bar: "bar2" },
                    { foo: "foo3", bar: "bar3" }
                ]
            },
            sheet: sheet
        });

        equal(sheet.range("A1").value(), "bar1");
        equal(sheet.range("B1").value(), null);
        equal(sheet.range("A2").value(), "bar2");
        equal(sheet.range("B2").value(), null);
        equal(sheet.range("A3").value(), "bar3");
        equal(sheet.range("B3").value(), null);
    });

    test("binds to nested object field", function() {
        var binder = new SheetDataSourceBinder({
            columns: [
                { field: "foo.bar" }
            ],
            dataSource: {
                data: [
                    { foo: { bar: "bar1" } },
                    { foo: { bar: "bar2" } },
                    { foo: { bar: "bar3" } }
                ]
            },
            sheet: sheet
        });

        equal(sheet.range("A1").value(), "bar1");
        equal(sheet.range("B1").value(), null);
        equal(sheet.range("A2").value(), "bar2");
        equal(sheet.range("B2").value(), null);
        equal(sheet.range("A3").value(), "bar3");
        equal(sheet.range("B3").value(), null);
    });

    test("changing sheet value updates the DataSource", function() {
        var binder = new SheetDataSourceBinder({
            columns: [
                { field: "foo" }
            ],
            dataSource: {
                data: [
                    { foo: "foo1", bar: "bar1" },
                    { foo: "foo2", bar: "bar2" },
                    { foo: "foo3", bar: "bar3" }
                ]
            },
            sheet: sheet
        });

        sheet.range("A1").value("baz");

        equal(binder.dataSource.at(0).foo, "baz");
    });

    test("changing sheet value of non bound column does not modify the data record", function() {
        var binder = new SheetDataSourceBinder({
            columns: [
                { field: "foo" }
            ],
            dataSource: {
                data: [
                    { foo: "foo1", bar: "bar1" },
                    { foo: "foo2", bar: "bar2" },
                    { foo: "foo3", bar: "bar3" }
                ]
            },
            sheet: sheet
        });

        sheet.range("C1").value("baz");

        var dataItem = binder.dataSource.at(0);
        equal(dataItem.foo, "foo1");
        equal(dataItem.bar, "bar1");
        equal(Object.keys(dataItem.toJSON()).length, 2);
    });

    test("changing sheet value of non bound row does not modify the data", function() {
        var binder = new SheetDataSourceBinder({
            columns: [
                { field: "foo" }
            ],
            dataSource: {
                data: [
                    { foo: "foo1", bar: "bar1" },
                    { foo: "foo2", bar: "bar2" },
                    { foo: "foo3", bar: "bar3" }
                ]
            },
            sheet: sheet
        });

        sheet.range("A4").value("baz");

        var data = binder.dataSource.data();
        equal(data.length, 3);
    });

    test("changing sheet value does not trigger second update the sheet", 1, function() {
        var binder = new SheetDataSourceBinder({
            columns: [
                { field: "foo" }
            ],
            dataSource: {
                data: [
                    { foo: "foo1", bar: "bar1" },
                    { foo: "foo2", bar: "bar2" },
                    { foo: "foo3", bar: "bar3" }
                ]
            },
            sheet: sheet
        });

        sheet.bind("change", ok.bind(this));
        sheet.range("A1").value("baz");
    });


    test("sheet setDataSource creates binder instance", function() {
        var dataSource = new kendo.data.DataSource({});

        sheet.setDataSource(dataSource);

        ok(sheet.dataSourceBinder instanceof SheetDataSourceBinder);
        strictEqual(sheet.dataSourceBinder.dataSource, dataSource);
        strictEqual(sheet.dataSourceBinder.sheet, sheet);
    });

    test("sheet setDataSource destroyes the previous binder", function() {
        sheet.setDataSource({});

        var binder = spy(sheet.dataSourceBinder, "destroy");

        sheet.setDataSource({});

        equal(binder.calls("destroy"), 1);
    });


})();
