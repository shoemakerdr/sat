module View.FilterPanel exposing (Model, Msg, initialModel, update, view)

import Data.Filter as Filter exposing (Filter)
import Data.Location as Location exposing (Location)
import Html exposing (Html, div, h1, text, input, select, option, button, p, span)
import Html.Attributes exposing (class, placeholder, value, selected, tabindex)
import Html.Events exposing (onInput, onClick)
import Util exposing (onChange)
import View.Options as Options


-- MODEL


type alias Model =
    { filters : List (Filter FilterType Location)
    , nameInput : String
    , typeSelect : String
    , individualSelected : Maybe Location
    }


type FilterType
    = Name
    | Type
    | Individual
    | IsTrashed


initialModel : Model
initialModel =
    { filters = [ isTrashedFilter ]
    , nameInput = ""
    , typeSelect = Location.noSelection
    , individualSelected = Nothing
    }


isTrashedFilter : Filter FilterType Location
isTrashedFilter =
    (Filter.new IsTrashed (not << .is_trashed))



-- UPDATE


type Msg
    = NameInputChange String
    | TypeSelectChange String
    | ResetFilterForm
    | ToggleIndividual Location


type FilterMsg
    = Merge
    | Remove


update : Msg -> Model -> Model
update msg model =
    case msg of
        NameInputChange name ->
            let
                filterMsg =
                    case name of
                        "" ->
                            Remove

                        _ ->
                            Merge
            in
                updateFilter
                    filterMsg
                    (Filter.new Name (filterByName name))
                    { model | nameInput = name }

        TypeSelectChange locationType ->
            let
                filterMsg =
                    if locationType == Location.noSelection then
                        Remove
                    else
                        Merge
            in
                updateFilter
                    filterMsg
                    (Filter.new Type (filterByType locationType))
                    { model | typeSelect = locationType }

        ResetFilterForm ->
            initialModel

        ToggleIndividual location ->
            case model.individualSelected of
                Nothing ->
                    updateFilter
                        Merge
                        (Filter.new Individual <| Location.equal location)
                        { model | individualSelected = Just location }

                Just _ ->
                    updateFilter
                        Remove
                        -- For `(\_ -> True)` need some predicate to satisfy type
                        (Filter.new Individual <| (\_ -> True))
                        { model | individualSelected = Nothing }


updateFilter : FilterMsg -> Filter FilterType Location -> Model -> Model
updateFilter filterMsg filter model =
    { model
        | filters =
            case filterMsg of
                Remove ->
                    Filter.remove filter model.filters

                Merge ->
                    Filter.merge filter model.filters
    }


filterByName : String -> Location -> Bool
filterByName name location =
    String.contains (String.toLower name) (String.toLower location.name)


filterByType : String -> Location -> Bool
filterByType locationType location =
    let
        locType =
            Location.fromReadable locationType
    in
        locType == location.loc_type



-- VIEW


view : List Location -> Model -> Html Msg
view locations model =
    let
        filteredLocations =
            Filter.apply model.filters locations
    in
        div [ class "location-filter-wrapper" ]
            [ h1 [ class "location-title" ] [ text "Locations" ]
            , viewForm model
            , div [ class "location-list" ] <| locationInfoList filteredLocations model
            ]


viewForm : Model -> Html Msg
viewForm { nameInput, typeSelect, individualSelected } =
    div []
        [ input
            [ class "form-name-input"
            , placeholder "Filter by name"
            , value nameInput
            , onInput NameInputChange
            ]
            []
        , select [ class "form-select-type", onChange TypeSelectChange ] <| Options.view typeSelect True
        , button [ onClick ResetFilterForm ] [ text "Reset filter" ]
        ]


locationInfoList : List Location -> Model -> List (Html Msg)
locationInfoList locations model =
    locations
        |> List.map
            (\location ->
                let
                    locationType =
                        Location.fromAbbr location.loc_type

                    extension =
                        Location.extensionToString location.extension

                    extString =
                        if extension == "" then
                            ""
                        else
                            ", ext. " ++ extension
                in
                    p
                        [ class "location-list-info"
                        , tabindex 0
                        , onClick <| ToggleIndividual location
                        ]
                        [ text <| location.name ++ " - " ++ locationType ++ extString
                        , span [ class "deselect" ]
                            [ model.individualSelected
                                |> Maybe.map (\_ -> "Click to deselect")
                                |> Maybe.withDefault ""
                                |> text
                            ]
                        ]
            )
