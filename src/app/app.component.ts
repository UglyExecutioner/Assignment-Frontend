import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Assignment-Frontend';
  totalUsers: any;
  chartData: number[]=[];
  chartLabel: string[]=['Latitude >0','Latitude <0','Longitude >0','Longitude <0'];
  apiData: any;
  pieChartType:string = 'pie';
  pieChartColors: Array < any > = [{
    backgroundColor: ['#fc5858', '#19d863', '#fdf57d'],
    borderColor: ['rgba(252, 235, 89, 0.2)', 'rgba(77, 152, 202, 0.2)', 'rgba(241, 107, 119, 0.2)']
  }];
  displayedColumns: string[] = ['Sno', 'name', 'username', 'city','pincode','company'];

  constructor(private http: HttpClient) {}
  ngOnInit(): void{

    this.getFromApi();

  }
  async getFromApi(){
    let lat_ge = 0;
    let lat_le = 0;
    let lon_ge = 0;
    let lon_le = 0;
    let count =0;
     this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(async(response)=>{
      console.log("Response",response)
      this.apiData = response;
      await this.apiData.forEach(element => {
        count = count +1;
        const lat = parseInt(element.address.geo.lat);
        const lon = parseInt(element.address.geo.lng);
        if(lat > 0){
          lat_ge = lat_ge+1;
        }else{
          lat_le +=1;
        }
        if(lon > 0){
          lon_ge +=1;
        }else{
          lon_le +=1;

        }
      });
      console.log("gte",lat_ge,lon_ge)
      console.log("lte",lat_le,lon_le)
      this.chartData.push(lat_ge);
      this.chartData.push(lat_le);
      this.chartData.push(lon_ge);
      this.chartData.push(lon_le)
      this.totalUsers = count;
      console.log("Chart data",this.chartData)
    })

  }

  chartClicked(e:any):void {
    console.log(e);
  }
  chartHovered(e:any):void {
    console.log(e);
  }


}

