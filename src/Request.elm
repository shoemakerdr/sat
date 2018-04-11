module Request exposing (saveDataPair)

import Data.FloorPlan
    exposing
        ( FloorPlan
        , FloorPlanDataPair
        , encodeFloorplan
        , dataPairDecoder
        )
import Data.Location exposing (Location)
import Http
import HttpBuilder
    exposing
        ( RequestBuilder
        , withHeader
        , withJsonBody
        , withTimeout
        , withExpect
        )
import Time
import Util exposing ((@))


type alias Domain =
    String


type alias Token =
    String


type alias DataPairHandler msg =
    Result Http.Error FloorPlanDataPair -> msg


saveDataPair : Domain -> Token -> FloorPlan -> List Location -> DataPairHandler msg -> Cmd msg
saveDataPair domain token floorplan locations handler =
    HttpBuilder.post (createApiUrl domain floorplan.id)
        |> withHeader "X-CSRFToken" token
        |> withJsonBody (encodeFloorplan floorplan locations)
        |> withTimeout (10 * Time.second)
        |> withExpect (Http.expectJson dataPairDecoder)
        |> (@) "NEW POST REQUEST"
        |> HttpBuilder.send handler


createApiUrl : Domain -> Int -> String
createApiUrl domain id =
    domain ++ "/api/floorplans/" ++ (toString id) ++ "/"
