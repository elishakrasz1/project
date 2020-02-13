import React from "react";

// import { graphql, compose, withApollo } from 'react-apollo';
// import gql from 'graphql-tag';

import MultiStep from './MultiStep';
import QuestionText from './QuestionText';
import QuestionDate from './QuestionDate';
import QuestionList from './QuestionList';
import QuestionInput from './QuestionInput'

import initial from '../../../bulk/initial.json'
import QuestionMultiple from "./QuestionMultiple";


const Question = (props) => {
    let final = false;
    
    function finish(wizardState) {
        wizardState.map((response) => {
            props.onCreateResponse(
                {
                    responsesQuId: response.id,
                    res: response.value
                }
            );
            return (<CircularProgress />)
        })
        props.history.push('/')
    }
    {console.log('internalinitial', initial)}
    return (
        <div>
            <div>
                <MultiStep
                    steps={
                        initial.map((item, index, arr) => {
                            if (arr.length - 1 === index) {
                                final = true
                            }
                            switch (item.type) {
                                case 'INPUT':
                                    return {
                                        name: item.id,
                                        component: <QuestionInput id={item.id} index={index} qu={item.qu} final={final} name={item.name} />
                                    }
                                case 'INPUT':
                                    return {
                                        name: item.id,
                                        component: <QuestionMultiple id={item.id} index={index} qu={item.qu} final={final} name={item.name} />
                                    }
                                case 'TEXT':
                                    return {
                                        name: item.id,
                                        component: <QuestionText id={item.id} index={index} qu={item.qu} final={final} name={item.name} />
                                    }
                                case 'DATE':
                                    return {
                                        name: item.id,
                                        component: <QuestionDate id={item.id} index={index} qu={item.qu} final={final} name={item.name} />
                                    }
                                case 'LIST':
                                    return {
                                        name: item.id,
                                        component: <QuestionList id={item.id} index={index} qu={item.qu} listOptions={item.listOptions} final={final} name={item.name} />
                                    }
                                default:
                                    return {
                                        name: item.id,
                                        component: <QuestionList id={item.id} index={index} qu={item.qu} final={final} listOptions={item.listOptions}/>
                                    }
                            }
                        })
                    }
                    onFinish={finish} />
            </div>
        </div>
    )
}

// const Questionnaire = compose(
//     graphql(gql(getQuestionnaire), {
//         options: (props) => ({
//             errorPolicy: 'all',
//             fetchPolicy: 'cache-and-network',
//             variables: { id: props.match.params.questionnaireID },
//         }),
//         props: (props) => {
//             return {
//                 getQuestionnaire: props ? props : [],
//             }
//         }
//     }),
//     graphql(gql(createResponses), {
//         props: (props) => ({
//             onCreateResponse: (response) => {
//                 props.mutate({
//                     variables: {
//                         input: response
//                     },
//                 })
//             }
//         })
//     })
// )(QuestionnairePart)

export default Question;