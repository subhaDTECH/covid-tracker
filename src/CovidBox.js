import React from 'react';
import "./CovidBox.css";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import numerall from "numeral"
import numeral from 'numeral';

const CovidBox = ({title,cases,total}) => {
    return (
        <div className="cardbox">
        <Card className="card">
            <CardContent>
                <Typography>{title}</Typography>
                <h2 className="cases_title">+{ cases} / todays</h2>
                <Typography>{numeral(total).format("0,0")} total</Typography>
            </CardContent>
        </Card>

            
        </div>
    )
}

export default CovidBox;
