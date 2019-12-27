import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { lightenColor, ratingChecker, performanceToClass, trimName } from "shared/utils";
import { purple, white, diamond, black, orange } from 'shared/styles/colors';

interface Props {
    athlete: any,
    removePick: any,
    user: any,
}


class PlayerCards extends Component<Props> {
    private constructor(props) {
        super(props);
    }

    ratingSymbol(rating){

            if(rating>=93){
                return "💎"
            }
            if(rating>=86){
                return "🔥"
            }
            if(rating>=81){
                return "👍"
            }
            if(rating<80){
                return "😂"
            }
        return null


    }

    public render() {
        const { athlete, removePick, user } = this.props
        console.log(performanceToClass(ratingChecker(athlete.rating)))

        return (
            <div className={css(styles.card)} onClick={() => removePick(athlete.id, user.id, athlete)}>

                <div>
                    <img className={css(styles.athleteImg)} src={athlete.img_url} />
                </div>
                <div>
                <div className={css(styles.upperSection)}>
                    {trimName(athlete.name)}
                </div>
                <div className={css(styles.belowSection)}>
                    {athlete.position}
                    <div className={performanceToClass(
                        ratingChecker(athlete.rating)
                    )}>
                        <div className={css(styles.rating)}>{athlete.rating}</div></div>
                </div>
                </div>
                <div className={css(styles.emoji)}>
                    {this.ratingSymbol(athlete.rating)}
                </div>
            </div>
        );
    }
}

export default PlayerCards;

const styles = StyleSheet.create({
    upperSection: {
        paddingTop: "1.3em",
        fontWeight: "bold",
    },
    belowSection: {
        paddingTop: "0.5em",
    },
    card: {
        borderRadius: "1em",
        width: "15em",
        height: "5em",
        filter:" drop-shadow(0.2em 0.2em 0.2em grey)",
        backgroundColor: `rgb(${diamond})`,
        ':hover': {
            backgroundColor: 'red'
        }
    },
    emoji:{
        float: "right",
        marginTop: "-3.8em",
        marginRight: "-4.7em",
        backgroundColor: `rgb(${lightenColor(diamond)})`,
        width: "2em",
        height: "2em",
        borderRadius: "0em 1em 0em 1em",
        paddingTop: "0.6em",
        paddingLeft: "0.45em"
    },
    athleteImg: {
        display: "inline",
        borderRadius: "20em",
        width: "5em",
        margin: "0.7em",

        float: "left",
    },
    rating: {
        paddingTop: "0.45em",
        textAlign:"center",
        float: "right",
        color: `rgb(${diamond})`,
        width: "1.7em",
        height: "1.7em",
        borderRadius: "1em",
        backgroundColor: black,
        display: "inline",
        marginRight: "3em",
        marginTop: "-1.3em"
    }
});
