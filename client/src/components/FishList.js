import React from "react";
import { Button, Icon } from 'react-materialize';
import API from "../utils/API";
import AliasModal from '../components/AliasModal/AliasModal';

function FishList(props) {
    const { fish, loggedIn, disableSave } = props;
    console.log("these fish are in FishList as results", fish.aliases[0])

    const handleAqFishSave = (fish_id) => {
        API.saveAqueryum({
            fish_id: fish_id,
        }).then(function (data) {
            window.location.replace("/aqueryum/create");
        }).catch(function (err) {
            console.log(err);
        });
    }

    return (
        <tr>
            <td>
                <strong><a key={fish._id} href={`/fish/${fish._id}`}>{fish.aliases[0]}</a></strong>
            </td>
            <td>
                {fish.scientificName}
            </td>
            <td>
                <AliasModal aliases={fish.aliases} />
            </td>
            <td className="hide-on-small-only">
                {fish.type}
            </td>
            <td>
                <Button
                    className={(loggedIn && !disableSave) ? "green" : "grey"}
                    floating
                    small
                    icon={<Icon>save</Icon>}
                    node="button"
                    waves="light"
                    onClick={(loggedIn) ? () => handleAqFishSave(fish._id) : ""}
                />
            </td>
        </tr>
    );
}

export default FishList;