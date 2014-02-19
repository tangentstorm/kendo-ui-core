<?php

namespace Kendo\Dataviz\UI;

class MapLayer extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The attribution for the layer. Accepts valid HTML.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function attribution($value) {
        return $this->setProperty('attribution', $value);
    }

    /**
    * If set to false the layer will not bind to the data source during initialization. In this case data binding will occur when the change event of the
data source is fired. By default the widget will bind to the data source specified in the configuration.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    /**
    * Sets the data source of the MapLayer.
    * @param array|\Kendo\Data\DataSource $value
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * Specifies the extent of the region covered by this layer.
The layer will be hidden when the specified area is out of view.Accepts a four-element array that specifies the extent covered by this layer:
North-West lat, longitude, South-East latitude, longitude.If not specified, the layer is always visible.
    * @param array $value
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function extent($value) {
        return $this->setProperty('extent', $value);
    }

    /**
    * The API key for the layer. Currently supported only for Bing (tm) tile layers.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function key($value) {
        return $this->setProperty('key', $value);
    }

    /**
    * The data item field which contains the marker location.
The field should be an array with two numbers - latitude and longitude.Requires the dataSource option to be set.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function locationField($value) {
        return $this->setProperty('locationField', $value);
    }

    /**
    * The default marker shape for data-bound markers. The following pre-defined marker shapes are available:Marker shapes are implemented as CSS classes on the marker element (span.k-marker).
For example "pinTarget" is rendered as "k-marker-pin-target".
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function shape($value) {
        return $this->setProperty('shape', $value);
    }

    /**
    * The data item field which contains the marker title.
Requires the dataSource option to be set.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function titleField($value) {
        return $this->setProperty('titleField', $value);
    }

    /**
    * The default Kendo UI Tooltip options for data-bound markers.
    * @param \Kendo\Dataviz\UI\MapLayerTooltip|array $value
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function tooltip($value) {
        return $this->setProperty('tooltip', $value);
    }

    /**
    * The the opacity for the layer.
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

    /**
    * A list of subdomains to use for loading tiles.
Alternating between different subdomains allows more requests to be executed in parallel.
    * @param array $value
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function subdomains($value) {
        return $this->setProperty('subdomains', $value);
    }

    /**
    * The default style for shapes.
    * @param \Kendo\Dataviz\UI\MapLayerStyle|array $value
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function style($value) {
        return $this->setProperty('style', $value);
    }

    /**
    * Sets the urlTemplate option of the MapLayer.
    * The URL template for tile layers. Template variables:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function urlTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('urlTemplate', $value);
    }

    /**
    * Sets the urlTemplate option of the MapLayer.
    * The URL template for tile layers. Template variables:
    * @param string $value The template content.
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function urlTemplate($value) {
        return $this->setProperty('urlTemplate', $value);
    }

    /**
    * The layer type. Supported types are "tile" and "shape".
    * @param string $value
    * @return \Kendo\Dataviz\UI\MapLayer
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

//<< Properties
}

?>
