import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, query, orderBy, startAfter, 
  DocumentData,
  Query,
  QueryConstraint,
  QueryDocumentSnapshot,
  limit,
  getDocs,
  getFirestore,} from '@angular/fire/firestore';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PaginatedResponse } from '../Helpers/paginated-response';
import { Post } from '../Helpers/post';
import { app } from '../../../server';
import path from 'path';



@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly redditApiUrl = 'https://www.reddit.com/r/FlutterDev';
  posts: any[] = [];

  constructor(private firestore: Firestore,private http: HttpClient)
   { }
   getHotPostsfunc(page: number): Observable<PaginatedResponse<Post>> {
    return this.http.get<PaginatedResponse<Post>>(`${this.redditApiUrl}/hot.json`, {
      params: {
        limit: 5,
        skip: page * 5,
      },
    });
  }
 
   getHotPosts(): Observable<any> {
    return this.http.get(`${this.redditApiUrl}/hot.json`);
  }

  getNewPosts(): Observable<any> {
    return this.http.get(`${this.redditApiUrl}/new.json`);
  }

  getRisingPosts(): Observable<any> {
    return this.http.get(`${this.redditApiUrl}/rising.json`);
  }
  storePostInFirebase(post: any, collectionName: string): Promise<any> {
    const aCollection = collection(this.firestore, collectionName);
    return addDoc(aCollection, post);
  }
  
  private isDataFetched = false;
  FetchDataAndStorePostsInFirebase(): void {
    this.getHotPosts().subscribe((hotPosts: any) => {
      hotPosts.data.children.forEach((post: any) => {
        const addpost = {
          title: post.data.title,
          auther:post.data.author_fullname
          
        };
        this.storePostInFirebase(addpost, 'Hotpost');
      });
    });

    this.getNewPosts().subscribe((newPosts: any) => {
      newPosts.data.children.forEach((post: any) => {
        const product = {
          title: post.data.title,
          auther:post.data.author_fullname
          // Add other relevant fields for the post
        };
        this.storePostInFirebase(product, 'Newpost');
      });
    });

    this.getRisingPosts().subscribe((risingPosts: any) => {
      risingPosts.data.children.forEach((post: any) => {
        const product = {
          title: post.data.title,
          auther:post.data.author_fullname
          // Add other relevant fields for the post
        };
        this.storePostInFirebase(product, 'Risingpost');
      });
    });
  }

  /****************READ POSTs FROM FIREBASE SERVICES AFTER ADDED TO *****************/

  GetAllNewPosts(): Observable<any[]> {
    let aCollection = collection(this.firestore, 'Newpost')
    return collectionData(aCollection,{idField:'id'});
  }


firstget: boolean = true;
documentSnapshots: any;
private _posts = new BehaviorSubject<Post[]>([]);

get postss() {
  return this._posts.asObservable();
} 

async GetAllNewPosts2() {
  const ref = collection(this.firestore, 'Newpost');

  if (this.firstget) {
    this.firstget = false;
    const q = query(ref, limit(5));
    this.documentSnapshots = await getDocs(q);
  } else {
    if (!this.documentSnapshots || this.documentSnapshots.empty)
    {
      // All posts have been fetched
    
      return [];
    }

    const lastVisible =this.documentSnapshots.docs[this.documentSnapshots.docs.length - 1];
    const q = query(ref, startAfter(lastVisible), limit(10));
    this.documentSnapshots = await getDocs(q);
  }

  const newNotes: Post[] = this.documentSnapshots.docs.map(
    (doc: { data: () => any; id: any }) => {
      let item: any = doc.data();
      item.id = doc.id;
      return item;
    }
  );

  if (newNotes.length > 0) {
    const currentPosts = this._posts.getValue();
    this._posts.next([...currentPosts, ...newNotes]);
  }

  return newNotes;
}



/**************************************************************************** */
  GetAllHotPosts(): Observable<any[]> {
    let aCollection = collection(this.firestore, 'Hotpost')
    return collectionData(aCollection,{idField:'id'});
  }



  GetAllRisingPosts(): Observable<any[]> {
    let aCollection = collection(this.firestore, 'Risingpost')
    return collectionData(aCollection,{idField:'id'});
  }
  
}


