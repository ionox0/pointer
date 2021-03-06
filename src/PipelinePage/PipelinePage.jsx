import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TableFooter from '@material-ui/core/TableFooter';

import { runService, pipelineService, authenticationService } from '@/_services';

class PipelinePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            currentUser: authenticationService.currentUserValue,
            pipelines: {
                "results" : [],
                "previous": null,
                "next": null,
                "count": 0
            }
        };
        this.loadPage = this.loadPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.downloadCWL = this.downloadCWL.bind(this);
        this.startRun = this.startRun.bind(this);
    }

    componentDidMount() {
        this.loadPage();
    }

    loadPage() {
        pipelineService.getPage(this.state.currentPage).then(pipelines => this.setState({ pipelines }));
    }

    nextPage(event) {
        this.state.currentPage = this.state.currentPage + 1;
        this.loadPage(this.state.currentPage)
    }

    previousPage(event) {
        this.state.currentPage = this.state.currentPage - 1;
        this.loadPage(this.state.currentPage)
    }

    downloadCWL(event) {
        pipelineService.downloadCWL(event.id, event.entrypoint);
    }

    startRun(event) {
        runService.createRun(event.id).then(run => this.props.history.push("/run/" + run.id));
    }

    render() {
        const { pipelines } = this.state
        return (
            <div>
                <Paper>
                    <Table className="table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="left">Pipeline Name</TableCell>
                            <TableCell align="left">github</TableCell>
                            <TableCell align="left">Version</TableCell>
                            <TableCell align="left">Entrypoint</TableCell>
                            <TableCell align="left">Download</TableCell>
                            <TableCell align="left">Run</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {pipelines.results.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        {row.name}
                                    </TableCell>
                                    <TableCell>
                                        {row.github}
                                    </TableCell>                            
                                    <TableCell>
                                        {row.version}
                                    </TableCell>
                                    <TableCell>
                                        {row.entrypoint}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" onClick={() => this.downloadCWL(row)}>Download</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" onClick={() => this.startRun(row)}>Run</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell>
                                <Button align="left" variant="contained" disabled={pipelines.previous == null} onClick={this.previousPage}>
                                    Previous
                                </Button>
                                </TableCell>
                                <TableCell align="center">
                                    Page: {this.state.currentPage}
                                </TableCell>
                                <TableCell>
                                </TableCell>
                                <TableCell align="right">
                                <Button variant="contained" disabled={pipelines.next == null} onClick={this.nextPage}>
                                    Next
                                </Button>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Paper>
            </div>
        )
    }

}

export { PipelinePage }; 